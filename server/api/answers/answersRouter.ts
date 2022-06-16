const router = require("express").Router();
import express, {Request, Response} from "express"
const Answers = require("./answersModel");


router.get("/", (res: Response) => {
    Answers.findAnswers()
      .then((answers: any) => {
        res.status(200).json(answers);
      })
      .catch((err: Error) => {
          res.status(400).json({message: err})
      });
});

router.get("/:id", (req: Request, res: Response) => {
  Answers.findById(req.params.id)
    .then((answers: any) => {
      res.status(200).json(answers);
    })
    .catch((err: Error) => {
        res.status(400).json({message: err})
    });
});

// Need to add middleware to authenticate specific user for them to post answers
router.post("/", (req: Request, res: Response) => {
    Answers.addAnswer(req.body)
        .then((answers: any) => {
            res.status(201).json(answers);
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message});
        });
});

// Need to add middleware to authenticate specific user for them to delete answers
router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    Answers.removeAnswer(id)
    .then((answers: any) => {
        if (!answers) {
          res.status(404).json({
            message: "The answer with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(answers);
        }
      })
      .catch((error: Error) => {
        console.log("Error: ", error);
        res.status(500).json({ errorMessage: "The answer could not be removed" });
      });
  });

// Need to add middleware to authenticate specific user for them to edit answers
  router.put("/:id", (req: Request, res: Response) => {
    Answers.updateAnswer(req.params.id, req.body)
      .then((answers: any) => {
        if (answers) {
          res.status(200).json(answers);
        } else {
          res.status(404).json({ message: "There was an issue completing this request" });
        }
      })
      .catch((error: Error) => {
        console.log("Error:", error);
        res.status(500).json({
          message: "Error updating the answer",
        });
      });
  });

module.exports = router;