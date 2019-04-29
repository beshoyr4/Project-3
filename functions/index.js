const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const os = require("os");

const { Storage } = require("@google-cloud/storage")

const gcconfig = {
  projectId: "profile-7ee82",
  keyFilename: "zT80kQq3OLlINQRc0eDXHAkbBCjCFtW9glaIYjZQ"
};

const gcs = new Storage(gcconfig);


exports.uploadFile = functions.https.onRequest((req, res) => {
  console.log("Here I am");
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  // if (req.method === 'OPTIONS') {
  //   res.status(204).send('');
  // }
  cors(req, res, () => {

    // if (req.method !== "POST") {
    //   return res.status(500).json({
    //     message: "Not allowed"
    //   });
    // }
  
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("profile-7ee82.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        // .then(() => {
        //   res.status(200).json({
        //     message: "It worked!"
        //   });
        // })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});