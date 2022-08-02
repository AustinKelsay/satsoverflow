import connectMongo from '../../../src/lib/connectMongo';
import Answers from '../../../src/models/answer';
import Questions from '../../../src/models/question';
import Comments from '../../../src/models/comment';

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
    // verify user middleware
    async function addComment(req, res) {
        try {
            await connectMongo();
            
            const answerId = req.query.slug[0];
            const comment = {
                body: req.body.text,
                author: req.body.author,
                answer_id: answerId
            }

            const newComment = await Comments.create(comment);
            
            res.status(201).json(newComment);
        } catch(err) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }