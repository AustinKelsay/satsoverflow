import { Schema, model, models } from "mongoose";

export const tagSchema = new Schema({
  name: { type: String, required: true },
  uses: { type: Number, default: 0 },
});

tagSchema.set("toJSON", { getters: true });
tagSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Tags = models.Tags || model("Tags", tagSchema);

export default Tags;
