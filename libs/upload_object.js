import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js";
import path from "path";
import fs from "fs";

const file = "../public/assets/sounds/bad1.mp4";
const fileStream = fs.createReadStream(file);

export const uploadParams = {
  Bucket: "lonoosh",
  Key: "audio/" + path.basename(file),
  Body: fileStream,
};

export const run = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();
