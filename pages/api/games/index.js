import dbConnect from "../../../utils/dbConnect";
import Game from "../../../models/Game";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const games = await Game.find({});
        res.status(200).json({ success: true, data: games });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log("BODY:", req.body);
        const game = await Game.create(req.body);
        res.status(201).json({ success: true, data: game });
      } catch (error) {
        console.log(`Error: ${error}`);
        res.status(400).json({
          success: false,
          message: `could not create new Hero with given Body - ${req.body}`,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
