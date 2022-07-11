import connectMongo from '../../src/lib/connectMongo';
import Questions from "../../src/models/question";

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
            return res.status(405).json({ error: 'Method not allowed' });
        }
    }
  }

    // Get all questions
    async function getQuestions(req, res) {
        try {
            await connectMongo();
            
            const questions = await Questions.find({});
            
            res.status(200).json(questions);
        } catch {
            res.status(500).json({ error: 'Something went wrong' });
        }
      }
        // Add question
        async function addQuestion(req, res) {
            try {
                await connectMongo();
                
                const newQuestion = await Questions.create(req.body);
                
                res.status(201).json(newQuestion);
            } catch {
                res.status(500).json({ error: 'Something went wrong' });
            }
        }