const { db } = require("../services/firestore");
const fs = require("fs");

const create_db = () => {
  fs.readFile("./beat-info.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const beat_content = JSON.parse(data);
      // send data to firestore database
      beat_content["beat_info"].forEach((beat) => {
        const doc_ref = db.collection("beat_info").doc(String(beat.id));
        doc_ref.set(beat);
      });
    }
  });
};
create_db();
