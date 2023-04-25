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
        const filter = JSON.parse(decodeURIComponent(req.query.filter));
        console.log("filter====", filter);
        const heros = await Hero.find(filter);
        res.status(200).json({ success: true, data: heros });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log("BODY:", req.body);
        await Hero.deleteMany({ name: req.body.name });
        const categories = req.body.categories.split(",");
        let categoryIds = [];
        for (const category of categories) {
          if (["needAudio"].includes(category)) {
            const file = await speechSynth(req.body.name);
            if (!file.success) throw "could not create file";
            req.body.audioFile = file.id;
          }
          console.log("category = ", category);
          const categoryFromDb = await Category.findOne({
            name: category,
          });
          console.log("categoryFromDb = ", categoryFromDb);

          categoryIds.push(categoryFromDb._id);
        }
        req.body.categories = categoryIds;
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
