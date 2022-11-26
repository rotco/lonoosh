// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js"; // Helper function that creates an Amazon S3 service client module.
import path from "path";
import fs from "fs";

const file = "../public/assets/sounds/bad1.mp4"; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = fs.createReadStream(file);

export const uploadParams = {
  Bucket: "lonoosh",
  Key: "audio/" + path.basename(file),
  Body: fileStream,
};

// Upload file to specified bucket.
export const run = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();
