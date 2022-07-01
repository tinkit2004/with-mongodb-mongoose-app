import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const keypadSchema = new Schema({ _id: ObjectId, key: String });
export default mongoose.models.keypad || mongoose.model("keypad", keypadSchema);
