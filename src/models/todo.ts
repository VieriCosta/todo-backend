import { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  color?: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    color: { type: String, default: "#f9f9f9" },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<ITodo>("Todo", TodoSchema);
