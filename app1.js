"use strict";

let data = "stackabuse.com";
let buff = new Buffer.from(data);
let base64data = buff.toString("base64");

console.log('"' + data + '" converted to Base64 is "' + base64data + '"');

import multer from "multer";
import path from "path";

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedVideoTypes = ["video/mp4", "video/mpeg", "video/quicktime"];
  const allowedAudioTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedVideoTypes.includes(file.mimetype) ||
    allowedAudioTypes.includes(file.mimetype)
  ) {
    console.log("I am here");
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Allowed types: image, video, audio"));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("I am here2");
    const uploadPath = path.resolve(__dirname, "../src/uploads");
    console.log(uploadPath, "uploadPath");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    console.log("I am here3");
  },
});

const singleFileUpload = (fieldName: string) => {
  return multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single(fieldName);
};

export { singleFileUpload };
