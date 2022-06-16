const router = require("express").Router();
import express, {Request, Response} from "express"
const Questions = require("./questionsModel");


router.get("/", (req: Request, res: Response) => {
    Questions.findQuestions()
      .then((questions: any) => {
        res.status(200).json(questions);
      })
      .catch((err: Error) => {
          res.status(400).json({message: err})
      });
});

router.get("/:id", (req: Request, res: Response) => {
  Questions.findById(req.params.id)
    .then((questions: any) => {
      res.status(200).json(questions);
    })
    .catch((err: Error) => {
        res.status(400).json({message: err})
    });
});


// Need to add middleware to authenticate specific user for them to post questions
router.post("/", (req: Request, res: Response) => {
    Questions.addQuestion(req.body)
        .then((questions: any) => {
            res.status(201).json(questions);
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message});
        });
});

// Need to add middleware to authenticate specific user for them to delete questions
router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    Questions.removeQuestion(id)
    .then((questions: any) => {
        if (!questions) {
          res.status(404).json({
            message: "The question with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(questions);
        }
      })
      .catch((error: Error) => {
        console.log("Error: ", error);
        res.status(500).json({ errorMessage: "The principle could not be removed" });
      });
  });

  // Need to add middleware to authenticate specific user for them to edit questions
  router.put("/:id", (req: Request, res: Response) => {
    Questions.updateQuestion(req.params.id, req.body)
      .then((questions: any) => {
        if (questions) {
          res.status(200).json(questions);
        } else {
          res.status(404).json({ message: "There was an issue completing this request" });
        }
      })
      .catch((error: Error) => {
        console.log("Error:", error);
        res.status(500).json({
          message: "Error updating the question",
        });
      });
  });

module.exports = router;