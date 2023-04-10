import User from "../../models/UserModel";
import dbConnect from "../../lib/dbConnect";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const { email, password } = req.body;
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        // Check if user input email and password
        if (!email || !password) {
          return res.status(400).json({ error: "empty" });
        }
        const foundUser = await User.findOne({ email: email }).exec();
        // Check if any user found
        if (foundUser) {
          const match = await bcrypt.compare(password, foundUser.password);
          if (match) {
            return res.status(200).json({
              _id: foundUser._id,
              name: foundUser.name,
              image: foundUser.image,
              email: foundUser.email,
            });
          } else {
            return res.status(400).json({ error: "Wrong credential" });
          }
        }
        return res.status(400).json({ error: "No user found" });
      } catch (error) {
        console.log(error);
        return res.status(400).send(error);
      }

    default:
      return res.status(400).send("No such API route");
  }
}

//   if (!email || !password) {
//     return res.status(400).json("Incorrect form submission");
//   }

// User.findOne({ email: email }, function (err, foundUser) {
//   if (err) {
//     res.json({ err });
//   } else {
//     if (foundUser) {
//       bcrypt.compare(
//         password,
//         foundUser.password,
//         function (err, result) {
//           // result == true
//           if (result === true) {
//             res.status(200).json({
//               _id: foundUser._id,
//               name: foundUser.email,
//               image: foundUser.image,
//             });
//           } else {
//             res.json(null);
//           }
//         }
//       );
//     }
//   }
// });
// /* create a new model in the database
