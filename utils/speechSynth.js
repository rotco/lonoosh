import {
  StartSpeechSynthesisTaskCommand,
  PollyClient,
} from "@aws-sdk/client-polly";

export default async function speechSynth(name) {
  try {
    const pollyClient = new PollyClient();
    var params = {
      OutputFormat: "mp3",
      OutputS3BucketName: "lonoosh",
      Text: name,
      TextType: "text",
      VoiceId: "Joanna",
      SampleRate: "16000",
      OutputS3KeyPrefix: `audio/${name}`,
    };
    const res = await pollyClient.send(
      new StartSpeechSynthesisTaskCommand(params)
    );
    console.log(res.SynthesisTask.OutputUri);
    console.log("Success, audio file added to " + JSON.stringify(res));
    return { success: true, id: `${name}.${res.SynthesisTask.TaskId}.mp3` };
  } catch (err) {
    console.log("Error putting object", err);
    return { success: false };
  }
}
