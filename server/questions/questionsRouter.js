const express = require('express');
const Questions = require('./questionsModel');
const router = express.Router();

router.get("/", (req, res) => {
    Questions.findQuestions()
      .then((questions) => {
        res.status(200).json(questions);
      })
      .catch((err) => {
          res.status(400).json({message: err})
      });
});

router.get("/:id", (req, res) => {
  Questions.findById(req.params.id)
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((err) => {
        res.status(400).json({message: err})
    });
});


// Need to add middleware to authenticate specific user for them to post questions
router.post("/", (req, res) => {
    Questions.addQuestion(req.body)
        .then((questions) => {
            res.status(201).json(questions);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        });
});

// Need to add middleware to authenticate specific user for them to delete questions
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Questions.removeQuestion(id)
    .then((questions) => {
        if (!questions) {
          res.status(404).json({
            message: "The question with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(questions);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        res.status(500).json({ errorMessage: "The principle could not be removed" });
      });
  });

  // Need to add middleware to authenticate specific user for them to edit questions
  router.put("/:id", (req, res) => {
    Questions.updateQuestion(req.params.id, req.body)
      .then((questions) => {
        if (questions) {
          res.status(200).json(questions);
        } else {
          res.status(404).json({ message: "There was an issue completing this request" });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        res.status(500).json({
          message: "Error updating the question",
        });
      });
  });

module.exports = router;