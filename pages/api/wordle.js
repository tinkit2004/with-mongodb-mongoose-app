import Wordle from "../../models/WordleModel";
import dbConnect from "../../lib/dbConnect";

export default async function wordleHandler(req, res) {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET": {
      const wordles = await Wordle.find();
      res.status(200).json(wordles);
      break;
    }

    default:
      break;
  }
}
