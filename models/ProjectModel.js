import mongoose from "mongoose";
const { Schema } = mongoose;
const ProjectDataSchema = new Schema({
  projectTitle: String,
  projectDescription: String,
  projectImageUrl: String,
});
export default mongoose.models.ProjectData ||
  mongoose.model("ProjectData", ProjectDataSchema);
