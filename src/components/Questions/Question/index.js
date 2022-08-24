import React from "react";
import Link from "next/link";
import { Grid, GridItem, Flex, Text, Box, Tag } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import styles from "./styles.module.css";

const Question = ({ author, title, text, tags, score, views, created, id }) => {
  return (
    <Grid
      borderBottom={"1px solid #e6e6e6"}
      borderTop={"1px solid #e6e6e6"}
      templateColumns={"15% 2fr"}
      className={styles.question}
    >
      <GridItem className={styles.gridItemLeft} colSpan={1}>
        <Text>Votes {score}</Text>
        <Text>Answers 0</Text>
        <Text>Views {views}</Text>
      </GridItem>
      <GridItem w={"90%"} colStart={2}>
        <Text fontSize={"1xl"}>
          <Link href={`/questions/${id}`} passHref>
            {title}
          </Link>
        </Text>
        <Text fontWeight={"normal"} margin={"1% auto"} fontSize={"sm"}>
          {text}
        </Text>
        <Text fontWeight={"normal"} color={"grey"} fontSize={"xs"}>
          {created}
        </Text>
        <Flex justifyContent={"space-between"} flexDirection={"row"}>
          <Flex
            whiteSpace={"nowrap"}
            flexDirection={"row"}
            justifyContent={"flex-start"}
          >
            {tags.map((tag) => (
              <Tag
                margin={"1%"}
                paddingTop={"1%"}
                paddingBottom={"1%"}
                marginLeft={0}
                key={tag}
              >
                {tag}
              </Tag>
            ))}
          </Flex>
          <Flex justifyContent={"flex-end"} flexDirection={"row"}>
            <Image w={"15%"} src={author.profilePhoto} alt={author.username} />
            <Text
              alignSelf={"center"}
              fontWeight={"normal"}
              color={"grey"}
              fontSize={"sm"}
              marginLeft={"3%"}
            >
              {author.username}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Question;
