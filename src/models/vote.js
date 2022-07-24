import { Schema, model, models } from 'mongoose';

export const voteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    vote: { type: Number, required: true },
    parentId: { type: Schema.Types.ObjectId, required: true }
  },
  { _id: false }
);

const Votes = models.Votes || model('Votes', voteSchema);

export default Votes;