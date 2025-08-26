import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  color?: string;
  favorite: boolean;
  createdAt: Date;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  color: { type: String, default: "#ffffff" },
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
