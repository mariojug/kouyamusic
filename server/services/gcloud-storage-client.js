require("dotenv").config({ path: require("find-config")(".env") });

// google cloud storage import, client init
const { Storage } = require("@google-cloud/storage");

// uncomment this before deployment
// const storage = new Storage();

// client init while devving
const storage = new Storage({
  keyFilename: "keys/kouyamusic-d3448f42ba74.json",
});

// bucket name
const bucketName = process.env.BUCKET_NAME;

module.exports = {
  storageClient: storage,
  bucketName: bucketName,
};
