import React from "react";
import Question from "../Question";
import { Text, Box } from "@chakra-ui/react";

const QuestionsList = ({ questions }) => {
  return (
    <Box>
      <Text paddingLeft={"2%"} margin={"2% auto"} fontSize={"3xl"}>
        Public questions
      </Text>
      {questions.length ? (
        questions.map((q) => <Question key={q.id} {...q} />)
      ) : (
        <p>loading</p>
      )}
    </Box>
  );
};

export default QuestionsList;
