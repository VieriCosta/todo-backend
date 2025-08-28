import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  color?: string;
  isFavorite: boolean;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    color: { type: String, default: "#f9f9f9" },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
