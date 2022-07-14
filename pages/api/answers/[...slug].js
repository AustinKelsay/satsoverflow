import connectMongo from '../../../src/lib/connectMongo';
import Answers from '../../../src/models/answer';
import Questions from '../../../src/models/question';

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'POST': {
            return addAnswer(req, res);
        }
        case 'PUT': {
            return updateAnswer(req, res);
        }
        case 'DELETE': {
            return deleteAnswer(req, res);
        }
        default: {
            return res.status(405).json({ msg: 'Method not allowed' });
        }
    }
}

    // Add answer
    async function addAnswer(req, res) {
        try {
            await connectMongo();

            const {author} = req.body;
            const {text} = req.body;

            const questionId = req.query.slug;
            const question = await Questions.findById(questionId);

            const answerOnQuestion = await question.addAnswer(author, text);

            res.status(201).json(answerOnQuestion);
        } catch(err) {
            res.status(500).json({ msg: 'Something went wrong', error: err });
        }
    }

    // Update answer
    async function updateAnswer(req, res) {
        try {
            await connectMongo();

            const {text} = req.body;

            const questionId = req.query.slug[0];
            const answerId = req.query.slug[1];

            const question = await Questions.findById(questionId);

            const updatedAnswer = await question.updateAnswer(answerId, text);

            res.status(200).json(updatedAnswer);
        } catch(err) {
            res.status(500).json({ msg: 'Something went wrong', error: err });
        }
    }

    // Delete answer
    async function deleteAnswer(req, res) {
        try {
            await connectMongo();

            const questionId = req.query.slug[0];
            const answerId = req.query.slug[1];

            const question = await Questions.findById(questionId);

            const deletedAnswer = await question.removeAnswer(answerId);

            res.status(200).json(deletedAnswer);
        } catch(err) {
            res.status(500).json({ msg: 'Something went wrong', error: err });
        }
    }