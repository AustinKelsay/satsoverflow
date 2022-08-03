import connectMongo from '../../../src/lib/connectMongo';
import Comments from '../../../src/models/comment';

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getCommentById(req, res);
        }  
        case 'PUT': {
            return updateCommentById(req, res);
        }
        case 'DELETE': {
            return deleteCommentById(req, res);
        }
        default: {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    }
  }

    async function getCommentById(req, res) {
        const { slug } = req.params;

        const comment = await Comments.findById(slug);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        return res.status(200).json(comment);
    }

    async function updateCommentById(req, res) {
        const { slug } = req.params;
        const { body } = req.body;
        const comment = await Comments.findByIdAndUpdate(slug, { body }, { new: true });
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        return res.status(200).json(comment);
    }

    async function deleteCommentById(req, res) {
        const { slug } = req.params;
        const comment = await Comments.findByIdAndDelete(slug);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        return res.status(200).json(comment);
    }