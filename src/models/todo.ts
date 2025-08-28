import mongoose, { Schema, model, type Document, type Model } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  color?: string;
  /** campo real salvo no Mongo */
  isFavorite: boolean;
  /** alias exposto no JSON */
  favorite?: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    color: { type: String, default: "#f9f9f9" },

    /**
     * Usamos isFavorite como campo real e criamos um alias "favorite".
     * O Mongoose aceita receber/ler "favorite" quando criamos o doc,
     * mas em updates precisamos mapear manualmente (feito no controller).
     */
    isFavorite: {
      type: Boolean,
      default: false,
      alias: "favorite",
    },
  },
  { timestamps: true }
);

/** Garantir que o alias "favorite" apareça no JSON/objeto */
const jsonOpts = {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    if (ret.favorite === undefined && typeof ret.isFavorite === "boolean") {
      ret.favorite = ret.isFavorite;
    }
    return ret;
  },
};

todoSchema.set("toJSON", jsonOpts);
todoSchema.set("toObject", jsonOpts);

/**
 * Evita OverwriteModelError no ambiente de dev (hot-reload).
 */
const Todo: Model<ITodo> =
  (mongoose.models.Todo as Model<ITodo>) || model<ITodo>("Todo", todoSchema);

export default Todo;
