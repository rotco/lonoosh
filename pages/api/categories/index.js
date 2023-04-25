import dbConnect from "../../../utils/dbConnect";
import Hero from "../../../models/Hero";
import speechSynth from "../../../utils/speechSynth";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
