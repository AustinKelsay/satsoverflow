import React from "react";
import {
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const QuestionForm = () => {
  return (
    <Flex>
      <FormControl m={"1%"}>
        <FormLabel>Title</FormLabel>
        <Input type="text" />
        <FormLabel>Description</FormLabel>
        <Textarea type="text" />
      </FormControl>
    </Flex>
  );
};

export default QuestionForm;
