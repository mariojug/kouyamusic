const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const serviceAccount = require("../keys/kouyamusic-d3448f42ba74.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { db };
