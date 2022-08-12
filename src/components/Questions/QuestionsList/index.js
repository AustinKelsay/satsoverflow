import React from "react";
import Question from "../Question";
import { Text } from "@chakra-ui/react";

const QuestionsList = ({ questions }) => {
  return (
    <div>
      <Text paddingLeft={"2%"} margin={"2% auto"} fontSize={"3xl"}>
        Public questions
      </Text>
      {questions ? (
        questions.map((q) => <Question key={q.id} {...q} />)
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default QuestionsList;
