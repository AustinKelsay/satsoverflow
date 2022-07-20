import connectMongo from '../../../src/lib/connectMongo';
import Questions from '../../../src/models/question';
import Answers from '../../../src/models/answer';

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getAnswerById(req, res);
        }
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

    // Get answer by id
    async function getAnswerById(req, res) {
        try {
            await connectMongo();
            const answerId = req.query.slug[0];
            const answer = await Answers.find({"id": answerId});
            res.status(200).json(answer);
        } catch {
            res.status(500).json({ msg: 'Something went wrong' });
        }
    }

    // Add answer
    async function addAnswer(req, res) {
        try {
            await connectMongo();

            const {author} = req.body;
            const {text} = req.body;

            const answerToSave = {
                author,
                text
            };

            const questionId = req.query.slug;
            const question = await Questions.findById(questionId);
            
            const saved = await question.save();
            const answer = await Answers.create(answerToSave);

            if (saved) {
                res.status(201).json(answer);
            }
            else {
                res.status(500).json({ msg: 'Something went wrong' });
            }
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

            const updatedAnswer = Answers.findByIdAndUpdate(answerId, {text});
            const saved = await question.save();

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