const { db } = require("../services/firestore");
const coll_ref = db.collection("beat_info");
const test_read = async () => {
  const coll = await coll_ref.get();
  coll.forEach((doc) => {
    console.log(doc.data());
  });
};
test_read();
