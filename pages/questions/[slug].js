import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

const Question = () => {
  const { slug } = useRouter().query;
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/questions/${slug}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug, question]);
  return (
    <div>
      {question ? (
        <Box m={"1%"}>
          <Flex flexDirection={"column"}>
            <Box borderBottom={"1px solid #e6e6e6"}>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                {question.title}
              </Text>
              <Flex
                w="30%"
                marginBottom={"2%"}
                marginTop={"2%"}
                justifyContent={"space-between"}
                flexDirection={"row"}
              >
                <Text fontSize={"xs"}>Created {question.created}</Text>
                <Text fontSize={"xs"}>Views {question.views}</Text>
                <Text fontSize={"xs"}>Votes {question.score}</Text>
              </Flex>
            </Box>
            <Text fontSize={"md"}>{question.text}</Text>
          </Flex>
        </Box>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default Question;
