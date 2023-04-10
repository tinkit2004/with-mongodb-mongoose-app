import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../../models/UserModel";
import dbConnect from "../../lib/dbConnect";
import { passwordRegex } from "../../lib/passwordRegex";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password, lastName, name } = req.body;
  //Validate if all fields are filled
  if (!email || !password || !lastName || !name) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  // Validate email input
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email !" });
  }
  // Validate password input
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
    });
  }
  try {
    //Connect to database
    await dbConnect();
    // Check if the user already exists
    const foundUser = await User.findOne({ email: email }).exec();
    if (foundUser) {
      return res.status(400).json({ error: "User already exist" });
    }
    // Hash the password
    const hash = await bcrypt.hash(password, 10);
    // Store the user data in the database
    const user = await User.create({
      name: name,
      email: email,
      password: hash,
      lastName: lastName,
    });
    // Send a success response
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong !" + error });
  }
}
