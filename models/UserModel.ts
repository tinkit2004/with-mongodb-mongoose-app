import mongoose from "mongoose";
export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  lastName?: string;
  password?: string;
}
const { Schema } = mongoose;
const userSchema = new Schema<UserInterface>({
  name: String,
  email: String,
  emailVerified: Date,
  image: String,
});
userSchema.add({ lastName: String, password: String });
export default (mongoose.models.User as mongoose.Model<UserInterface>) ||
  mongoose.model<UserInterface>("User", userSchema);
