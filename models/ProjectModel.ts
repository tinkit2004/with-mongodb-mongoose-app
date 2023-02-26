import mongoose from "mongoose";
export interface ProjectInterface {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  projectImageUrl: string;
}

const { Schema } = mongoose;
const ProjectDataSchema = new Schema<ProjectInterface>({
  projectTitle: String,
  projectDescription: String,
  projectImageUrl: String,
});
export const ProjectData = mongoose.model<ProjectInterface>(
  "ProjectData",
  ProjectDataSchema
);
