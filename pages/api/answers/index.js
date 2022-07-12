import connectMongo from '../../../src/lib/connectMongo';
import Answers from '../../../src/models/answer';

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getAnswersByQuestionId(req, res);
        }

        case 'POST': {
            return addAnswer(req, res);
        }
        default: {
            return res.status(405).json({ msg: 'Method not allowed' });
        }
    }
}

    // Get all answers by question id
    async function getAnswersByQuestionId(req, res) {
        try {
            await connectMongo();

            const answers = await Answers.find({ questionId: req.query.questionId });

            res.status(200).json(answers);
        } catch {
            res.status(500).json({ msg: 'Something went wrong', error: err });
        }
    }

    // Add answer
    async function addAnswer(req, res) {
        try {
            await connectMongo();

            const {id} = req.user;
            const {text} = req.body;

            const answerOnQuestion = await req.question.addAnswer(id, text);

            res.status(201).json(answerOnQuestion);
        } catch {
            res.status(500).json({ msg: 'Something went wrong', error: err });
        }
    }