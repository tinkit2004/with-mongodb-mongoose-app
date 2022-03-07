const bcrypt = require("bcrypt");
const saltRounds = 10;
import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
export default async function handler(req, res) {
  const { email, password, lastName, name } = req.body;
  //console.log(email, password, lastName, name);

  await dbConnect();
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        if (!email || !name || !password) {
          return res.status(400).json({ success: false, error: "empty" });
        }
        const foundUser = await User.findOne({ email: email }).exec();
        if (foundUser) {
          return res
            .status(400)
            .json({ success: false, error: "User already exist" });
        } else {
          const hash = await bcrypt.hash(password, saltRounds);
          const user = await User.create({
            name: name,
            email: email,
            password: hash,
            lastName: lastName,
          });
          return res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            lastName: user.lastName,
          });
        }
        // User.findOne({ email: email }).then((foundUser) => {
        //   if (foundUser) {
        //     return res.status(400).json({ email: "This user already exist" });
        //   } else {
        //     bcrypt.hash(password, saltRounds, (err, hash) => {
        //       // Store hash in your password DB.
        //       const user = User.create({
        //         name: name,
        //         email: email,
        //         password: hash,
        //         lastName: lastName,
        //       });
        //       res.status(200).json({
        //         success: true,
        //         data: { name: name, email: email, lastName: lastName },
        //       });
        //     });
        //     /* create a new model in the database */
        //   }
        // });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "No user created" });
      break;
  }
}
