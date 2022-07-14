import { Schema, model, models } from 'mongoose';

import {voteSchema} from './vote';
import {commentSchema} from './comment';
import {answerSchema} from './answer';

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
  votes: [voteSchema],
  comments: [commentSchema],
  answers: [answerSchema],
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

questionSchema.methods = {
  vote: function (user, vote) {
    const existingVote = this.votes.find((v) => v.user._id.equals(user));

    if (existingVote) {
      // reset score
      this.score -= existingVote.vote;
      if (vote == 0) {
        // remove vote
        this.votes.pull(existingVote);
      } else {
        //change vote
        this.score += vote;
        existingVote.vote = vote;
      }
    } else if (vote !== 0) {
      // new vote
      this.score += vote;
      this.votes.push({ user, vote });
    }

    return this.save();
  },

  addComment: function (author, body) {
    this.comments.push({ author, body });
    return this.save();
  },

  updateComment: function (id, body) {
    const comment = this.comments.id(id);
    if (!comment) throw new Error('Comment not found');
    comment.body = body;
    return this.save();
  },

  removeComment: function (id) {
    const comment = this.comments.id(id);
    if (!comment) throw new Error('Comment not found');
    comment.remove();
    return this.save();
  },

  addAnswer: function (author, text) {
    this.answers.push({ author, text });
    return this.save();
  },

  updateAnswer: function (id, text) {
    const answer = this.answers.id(id);
    if (!answer) throw new Error('Answer not found');
    answer.text = text;
    return this.save();
    },

  removeAnswer: function (id) {
    const answer = this.answers.id(id);
    if (!answer) throw new Error('Answer not found');
    answer.remove();
    return this.save();
  }
};

// questionSchema.pre(/^find/, function () {
//   this.populate('author')
//     .populate('comments.author')
//     .populate('answers.author')
//     .populate('answers.comments.author');
// });

// questionSchema.pre('save', function (next) {
//   this.wasNew = this.isNew;
//   next();
// });

// questionSchema.post('save', function (doc, next) {
//   if (this.wasNew) this.vote(this.author._id, 1);
//   doc
//     .populate('author')
//     .populate('answers.author')
//     .populate('comments.author')
//     .populate('answers.comments.author')
//     .execPopulate()
//     .then(() => next());
// });

const Questions = models.Questions || model('Questions', questionSchema);

export default Questions;
