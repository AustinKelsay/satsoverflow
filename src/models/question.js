import { Schema, model, models } from 'mongoose';

const questionSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  tags: [{ type: String, required: true }],
  score: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
});

questionSchema.set('toJSON', { getters: true });

questionSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Questions = models.Questions || model('Questions', questionSchema);

export default Questions;
