import connectMongo from '../../../src/lib/connectMongo';
import Questions from "../../../src/models/question";

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getQuestionById(req, res);
        }
        case 'PUT': {
            return updateQuestion(req, res);
        }
        case 'DELETE': {
            return deleteQuestion(req, res);
        }
        default: {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    }
  }

    // Get question by id
    async function getQuestionById(req, res) {
        try {
            await connectMongo();
            
            const question = await Questions.findById(req.query.slug);
            
            res.status(200).json(question);
        } catch {
            res.status(500).json({ error: 'Something went wrong' });
        }
      }
    
    // Update question
    async function updateQuestion(req, res) {
        try {
            await connectMongo();
            
            const updatedQuestion = await Questions.findByIdAndUpdate(req.query.slug, req.body, { new: true });
            
            res.status(200).json(updatedQuestion);
        } catch {
            res.status(500).json({ error: 'Something went wrong' });
        }
      }
    
    // Delete question
    async function deleteQuestion(req, res) {
        try {
            await connectMongo();
            
            const deletedQuestion = await Questions.findByIdAndDelete(req.query.slug);
            
            res.status(200).json(deletedQuestion);
        } catch {
            res.status(500).json({ error: 'Something went wrong' });
        }
      }