import {
  StartSpeechSynthesisTaskCommand,
  PollyClient,
} from "@aws-sdk/client-polly";

// Create the parameters
var params = {
  OutputFormat: "mp3",
  OutputS3BucketName: "lonoosh",
  Text: "Pikachu",
  TextType: "text",
  VoiceId: "Joanna",
  SampleRate: "22050",
  OutputS3KeyPrefix: "audio/pickachu",
};
const pollyClient = new PollyClient();
const run = async () => {
  try {
    const res = await pollyClient.send(
      new StartSpeechSynthesisTaskCommand(params)
    );
  } catch (err) {
    console.log("Error putting object", err);
  }
};
run();
