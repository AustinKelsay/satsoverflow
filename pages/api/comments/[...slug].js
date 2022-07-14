import connectMongo from '../../../src/lib/connectMongo';
import Answers from '../../../src/models/answer';
import Questions from '../../../src/models/question';

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'POST': {
            return addComment(req, res);
        }
        case 'PUT': {
            return updateComment(req, res);
        }
      
        case 'DELETE': {
            return deleteComment(req, res);
        }
        default: {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    }
  }

    // Add comment
    async function addComment(req, res) {
        try {
            await connectMongo();

            const isAnswerComment = req.body.answer;
            if (isAnswerComment) {
                const answerId = req.query.slug[0];
                const comment = req.body.text;
                const answer = await Answers.findById(answerId);
                const newComment = await answer.addComment(comment);
                res.status(201).json(newComment);
            }


            res.status(201).json(answerOnQuestion);
        } catch(err) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }