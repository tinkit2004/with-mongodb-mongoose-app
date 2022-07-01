import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Int32 = require("mongoose-int32").loadType(mongoose);
const { Schema } = mongoose;

const wordleSchema = new Schema({ _id: ObjectId, id: Int32, word: String });
export default mongoose.models.wordle || mongoose.model("wordle", wordleSchema);
