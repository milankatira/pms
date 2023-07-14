import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  userId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  status: string;
  duration: number;
  date: Date;
  note: string;
}

const LogSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    status: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ILog>("Log", LogSchema);
