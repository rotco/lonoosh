// Import required AWS SDK clients and commands for Node.js.
import { GetBucketWebsiteCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js"; // Helper function that creates an Amazon S3 service client module.

// Create the parameters for calling
export const bucketParams = { Bucket: "lonoosh" };

export const run = async () => {
  try {
    const data = await s3Client.send(new GetBucketWebsiteCommand(bucketParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();
