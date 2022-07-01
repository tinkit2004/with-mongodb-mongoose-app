import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  email: String,
  emailVerified: Date,
  image: String,
});
userSchema.add({ lastName: String, password: String });
export default mongoose.models.User || mongoose.model("User", userSchema);
