import connectMongo from '../../../src/lib/connectMongo';
import Questions from '../../../src/models/question';
import Answers from '../../../src/models/answer';

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getQuestions(req, res);
        }
        case 'POST': {
            return addQuestion(req, res);
        }
        default: {
            return res.status(405).json({ msg: 'Method not allowed' });
        }
    }
}

const upvote = async (req, res) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, 1);
      const question = await req.question.save();
      return res.json(question);
    }
    const question = await req.question.vote(id, 1);
    return res.json(question);
  };
  
const downvote = async (req, res) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, -1);
      const question = await req.question.save();
      return res.json(question);
    }
    const question = await req.question.vote(id, -1);
    return res.json(question);
  };
  
const unvote = async (req, res) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, 0);
      const question = await req.question.save();
      return res.json(question);
    }
    const question = await req.question.vote(id, 0);
    return res.json(question);
  };