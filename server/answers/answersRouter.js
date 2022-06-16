const express = require('express');
const Answers = require('./answersModel');
const router = express.Router();


router.get("/", (req, res) => {
    Answers.findAnswers()
      .then((answers) => {
        res.status(200).json(answers);
      })
      .catch((err) => {
          res.status(400).json({message: err})
      });
});

router.get("/:id", (req, res) => {
  Answers.findById(req.params.id)
    .then((answers) => {
      res.status(200).json(answers);
    })
    .catch((err) => {
        res.status(400).json({message: err})
    });
});

// Need to add middleware to authenticate specific user for them to post answers
router.post("/", (req, res) => {
    Answers.addAnswer(req.body)
        .then((answers) => {
            res.status(201).json(answers);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        });
});

// Need to add middleware to authenticate specific user for them to delete answers
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Answers.removeAnswer(id)
    .then((answers) => {
        if (!answers) {
          res.status(404).json({
            message: "The answer with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(answers);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        res.status(500).json({ errorMessage: "The answer could not be removed" });
      });
  });

// Need to add middleware to authenticate specific user for them to edit answers
  router.put("/:id", (req, res) => {
    Answers.updateAnswer(req.params.id, req.body)
      .then((answers) => {
        if (answers) {
          res.status(200).json(answers);
        } else {
          res.status(404).json({ message: "There was an issue completing this request" });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        res.status(500).json({
          message: "Error updating the answer",
        });
      });
  });

module.exports = router;