import dbConnect from "../../../utils/dbConnect";
import Game from "../../../models/Game";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const game = await Game.findById(id);
        res.status(200).json({ success: true, data: game });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const game = await Game.create(req.body);
        res.status(201).json({ success: true, data: game });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
