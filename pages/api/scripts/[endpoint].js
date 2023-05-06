import dbConnect from "../../../utils/dbConnect";
import Hero from "../../../models/Hero";
import Category from "../../../models/Category";
import { MissingVowel } from "../../../utils/MissingVowel";

export default async function handler(req, res) {
  const { endpoint } = req.query;
  await dbConnect();
  switch (endpoint) {
    case "update_all":
      const heros = await Hero.find({});
      const filter = {};
      const update = { $set: { type: "pokemon" } };
      // commenting the actual update to avoid user mistake
      // await Hero.updateMany(filter, update);
      const postHeros = await Hero.find({});
      res
        .status(200)
        .json({ message: `Hello from ${endpoint}!`, postHeros: postHeros });
      break;
    case "update_nikud":
      // const herosForNikud = await Hero.find({ type: { name: "needNikud" } });
      async function findHeroes() {
        try {
          const needNikudCategory = await Category.findOne({
            name: "needNikud",
          });
          const heros = await Hero.find({
            categories: { _id: "64478b671c77afe1ae08aafa" },
          });

          return heros; //.filter((hero) => hero.categories.name == "needNikud");
        } catch (err) {
          console.error(err);
        }
      }

      const herosForNikud = await findHeroes();
      async function addNikud(heros) {
        for (const hero of heros) {
          if (!hero.hebrewWithNikud) {
            try {
              const missingVowel = new MissingVowel();
              const hebWithNikud = await missingVowel.getVowels(hero.hebrew);
              const added = await Hero.updateOne(
                { _id: hero._id },
                { $set: { hebrewWithNikud: hebWithNikud } }
              );
              console.log(`hero added: ${added}`);
            } catch (err) {
              console.log("ERROR=", err);
            }
          }
        }
      }
      await addNikud(herosForNikud);
      res.status(200).json({
        message: `Hello from ${endpoint}!`,
        herosForNikud: herosForNikud,
      });

      break;
    case "endpoint2":
      // handle endpoint2 for the given workspace
      res.status(200).json({ message: `Hello from ${endpoint}!` });
      break;
    // add more cases for additional endpoints
    default:
      res.status(404).json({ message: `Endpoint ${endpoint} not found for!` });
      break;
  }
}
