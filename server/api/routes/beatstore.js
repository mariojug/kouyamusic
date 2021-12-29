require("dotenv").config({ path: require("find-config")(".env") });

const MG_API_KEY = process.env.MAILGUN_KEY;
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: MG_API_KEY, domain: "mg.kouyamusic.com" });
const cors = require("cors");
const STRIPE_KEY =
  // process.env.STRIPE_KEY ||
  "sk_test_51JeDJ4Ln1IKQq1hKfgt1twmxJ1eTpdrMlZzAIvCBWNezogAU8GYU4jjsxvp751dqf5V7jRtGtAcF2pQ2TDBof5RL00gY63JEg5";
const YOUR_DOMAIN = "http://localhost:8080";

const stripe = require("stripe")(STRIPE_KEY);
const express = require("express");

const successToConsole = (type, path) => {
  console.log(
    `${path}: [${type.toUpperCase()}]\n${new Date().toString()}\nSuccessfully served`
  );
};

const router = express.Router();

const { db } = require("../../services/firestore");
const {
  storageClient,
  bucketName,
} = require("../../services/gcloud-storage-client");

const beats_coll = db.collection("beat_info");
const payments_coll = db.collection("payment_temps");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

const queryPublicFS = async (req, res, next) => {
  const coll = await beats_coll.get();
  req.docs = [];
  coll.forEach((doc) => req.docs.push(doc.data()));
  next();
};

const queryPathFS = async (req, res, next) => {
  const doc_ref = beats_coll.doc(req.query.id);
  await doc_ref
    .get()
    .then((doc) => {
      req.file_path = doc.data().file_path;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const queryPriceFS = async (req, res, next) => {
  console.log(req.body.cart);
  req.price_ids = [];
  try {
    for (var key in req.body.cart) {
      const cartItemRef = req.body.cart[key];
      const doc_ref = beats_coll.doc(cartItemRef.id.toString());
      await doc_ref
        .get()
        .then((doc) =>
          req.price_ids.push(doc.data().price_id[cartItemRef.type])
        )
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const queryFileGS = (req, res, next) => {
  const queryType = req.query.type;
  let expiration = 0;
  let ext = "";

  if (queryType === "audio") {
    expiration = Date.now() + 0.5 * 60 * 10000; // 30 sec from call
    ext = "sample.mp3";
  } else if (queryType === "image") {
    console.log("here");
    expiration = Date.now() + 0.5 * 60 * 10000; // 30 sec from call
    ext = "Cover.JPG";
  }

  res.header("expires", expiration);
  // get sample beat url
  getCloudPromise(bucketPath(req.file_path, ext), expiration)
    .then((result) => {
      req.result = result[0];
      next();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const generatePayKeys = (req, res, next) => {
  const newID = getString(10);
  const newHash =
    Math.floor(Math.random() * 999).toString() +
    getString(25) +
    Math.floor(Math.random() * 999).toString() +
    getString(10);

  // add ID and hash to req object
  req.pay_id = newID;
  req.pay_hash = newHash;

  // add ID and hash to firestore database
  const doc_ref = payments_coll.doc(newID);
  doc_ref.set({ hash: newHash, time: Date.now(), cart: req.body.cart });
  next();
};

// utility functions
// takes document mongo object and returns array of cloud boilerplate paths for cover art and sample beat

const getCloudPromise = async (path, expiration) => {
  // options for signed url generation w gcloud client
  const options = {
    version: "v4",
    action: "read",
    expires: expiration,
  };
  return await storageClient
    .bucket(bucketName)
    .file(path)
    .getSignedUrl(options);
};

const bucketPath = (docName, docExt) => {
  return `public/${docName}/${docName}-${docExt}`;
};

const getString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

router.get("/load", queryPublicFS, (req, res) => {
  try {
    res
      .json(
        req.docs.map((item) => {
          return {
            name: item.name,
            key: item.key,
            id: item.id,
            tags: item.tags,
            bpm: item.bpm,
          };
        })
      )
      .status(200);
    successToConsole("post", "/api/load");
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/load-item/", queryPathFS, queryFileGS, (req, res) => {
  try {
    res.json(req.result).status(200);
    successToConsole("post", "/api/audio-load");
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post(
  "/create-checkout-session",
  generatePayKeys,
  queryPriceFS,
  async (req, res) => {
    const rdString = getString(20);
    console.log(req.price_ids);
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: "price_1KBsMlLn1IKQq1hKuxOsEmIx", quantity: 1 }],
      // req.price_ids.map((id) => {
      //   return {
      //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      //     price: id,
      //     quantity: 1,
      //   };
      // }),
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/api/beatstore/checkout-success/${req.pay_id}?success=true&hash=${req.pay_hash}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.redirect(303, session.url);
  }
);
router.get("/checkout-success/:id", async (req, res) => {
  // check that the id and hash matches document
  const user = "mariojjuguilon@gmail.com";
  const id = req.params.id;
  const hash = req.query.hash;
  const doc_ref = payments_coll.doc(id);
  await doc_ref.get().then((doc) => {
    if (hash === doc.data().hash) {
      const currDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        return mm + "/" + dd + "/" + yyyy;
      };
      const data = {
        from: "KOUYA <noreply@kouyamusic.com>",
        to: "waworiginal@gmail.com",
        subject: "Your Download Links (" + currDate() + ")",
        html:
          "Thanks for your purchase at kouyamusic.com! Here are the download links you requested. " +
          "An invoice for your lease(s) has been sent in a separate e-mail message. More information about beat leases can be found <a href='https://kouyamusic.com/leases'>here</a>. " +
          "Please contact <a href='mailto:admin@kouyamusic.com'>admin@kouyamusic.com</a> or <a href='mailto:mariojjuguilon@gmail.com'>mariojjuguilon@gmail.com</a> if you have any questions.",
      };
      mg.messages().send(data, function (err, body) {
        if (err) {
          console.log(err);
          res.send(500);
          return;
        }
        console.log(body);
      });
      //
    }
  });
});

module.exports = router;
