import dbConnect from "../../../utils/dbConnect";
import Hero from "../../../models/Hero";

export default async function handler(req, res) {
  const { endpoint } = req.query;
  await dbConnect();
  switch (endpoint) {
    case "update_all":
      const heros = await Hero.find({});
      console.log("heros:", heros);
      const filter = {};
      const update = { $set: { type: "pokemon" } };
      await Hero.updateMany(filter, update);
      const postHeros = await Hero.find({});
      res
        .status(200)
        .json({ message: `Hello from ${endpoint}!`, postHeros: postHeros });
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
