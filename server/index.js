const express = require("express");
const server = express()

const answersRouter = require("./answers/answersRouter");
const questionsRouter = require("./questions/questionsRouter");

server.use(express.json());

server.use("/api/answers", answersRouter);
server.use("/api/questions", questionsRouter);

server.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});