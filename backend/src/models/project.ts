import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  status: string;
  description: string;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
