import dbConnect from "../../../utils/dbConnect";
import Hero from "../../../models/Hero";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  await dbConnect();
  console.log("id=", id);
  switch (method) {
    case "GET":
      try {
        const hero = await Hero.findById(id);
        res.status(200).json({ success: true, data: hero });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const hero = await Hero.create(req.body);
        res.status(201).json({ success: true, data: hero });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
