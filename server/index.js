const express = require("express");
const server = express()
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const answersRouter = require("./answers/answersRouter");
const questionsRouter = require("./questions/questionsRouter");
const usersRouter = require("./users/usersRouter");
const lnAuthRouter = require("./lnAuth/lnAuthRouter");

server.use(express.json());
server.use(morgan("tiny"));
server.use(helmet());
server.use(cors());

server.use("/api/answers", answersRouter);
server.use("/api/questions", questionsRouter);
server.use("/api/auth/users", usersRouter);
server.use("/api/auth/lnauth", lnAuthRouter);

server.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});