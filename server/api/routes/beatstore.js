require("dotenv").config({ path: require("find-config")(".env") });

const successToConsole = (type, path) => {
  console.log(
    `${path}: [${type.toUpperCase()}]\n${new Date().toString()}\nSuccessfully served`
  );
};

const express = require("express");
const router = express.Router();

const { db } = require("../../services/firestore");
const {
  storageClient,
  bucketName,
} = require("../../services/gcloud-storage-client");

const beats_info = db.collection("beats_info");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const queryBeat_info = async (req, res, next) => {
  const coll_ref = db.collection("beat_info");
  const coll = await coll_ref.get();
  res.docs = [];
  coll.forEach((doc) => res.docs.push(doc.data()));
  console.log(res.docs);
  next();
};

const queryBucket = (req, res, next) => {
  let expiration = Date.now() + 0.5 * 60 * 10000; // 30 sec from call
  res.header("expires", expiration);
  const promises = res.docs.map(
    async (doc) => await getCloudPromises(doc, expiration)
  );
  Promise.allSettled(promises)
    .then((results) => {
      console.log(results);
      req.public_data = [];
      results.forEach((result, i) => {
        let body = assembleBody(res.docs[i], result);
        req.public_data.push(body);
      });
      next();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
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

// determine which urls need to be fetched based on queryType
// get each cloud promise
const getCloudPromises = async (doc, expiration) => {
  // get cover url
  coverUrlPromise = await getCloudPromise(
    bucketPath(doc.file_path, "Cover.JPG"),
    expiration
  );

  // get sample beat url
  sampleUrlPromise = await getCloudPromise(
    bucketPath(doc.file_path, "sample.mp3"),
    expiration
  );

  return [coverUrlPromise, sampleUrlPromise];
};

const bucketPath = (docName, docExt) => {
  return `public/${docName}/${docName}-${docExt}`;
};

const assembleBody = (mongo_doc, res_signedUrls) => {
  return {
    id: mongo_doc.id,
    name: mongo_doc.name,
    coverURL: res_signedUrls.value[0][0],
    audioURL: res_signedUrls.value[1][0],
    tags: mongo_doc.tags,
    bpm: mongo_doc.bpm,
    musicKey: mongo_doc.key,
  };
};
// send post request
router.post("/checkout", (req, res) => {
  // in req body: e-commerce info
  // checkout flow follow
  // https://stripe.com/docs/payments/accept-a-payment - primary implement
  // https://stripe.com/docs/payments/accept-a-payment-synchronously - requires more server implement, secondary
});

router.post("/load", queryBeat_info, queryBucket, (req, res) => {
  try {
    res.json(req.public_data).status(200);
    successToConsole("post", "/api/load");
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = router;
