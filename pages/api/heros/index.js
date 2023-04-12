import dbConnect from "../../../utils/dbConnect";
import Hero from "../../../models/Hero";
import speechSynth from "../../../utils/speechSynth";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const heros = await Hero.find({});
        res.status(200).json({ success: true, data: heros });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log("BODY:", req.body);
        if (["pokemon", "superhero"].includes(req.body.type)) {
          const file = await speechSynth(req.body.name);
          if (!file.success) throw "could not create file";
          req.body.audioFile = file.id;
        }
        const hero = await Hero.create(req.body);
        res.status(201).json({ success: true, data: hero });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: `could not create new Hero with given Body - ${req.body}, error - ${error}`,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
