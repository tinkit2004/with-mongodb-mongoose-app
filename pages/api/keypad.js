import Keypad from "../../models/KeypadModel";
import dbConnect from "../../lib/dbConnect";

export default async function wordleHandler(req, res) {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET": {
      const keypads = await Keypad.find();
      res.status(200).json(keypads);
      break;
    }

    default:
      break;
  }
}
