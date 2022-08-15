import React from "react";
import Link from "next/link";
import { Tag } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import styles from "./styles.module.css";

const Question = ({ author, title, text, tags, score, views, created, id }) => {
  return (
    <Grid
      borderBottom={"1px solid #e6e6e6"}
      templateColumns={"15% 2fr"}
      className={styles.question}
    >
      <GridItem className={styles.gridItemLeft} colSpan={1}>
        <Text>Votes {score}</Text>
        <Text>Answers 0</Text>
        <Text>Views {views}</Text>
      </GridItem>
      <GridItem className={styles.gridItemRight} colStart={2}>
        <Text fontSize={"1xl"} color={"#0000EE"}>
          <Link href={`/questions/${id}`}>{title}</Link>
        </Text>
        <Text fontWeight={"normal"} margin={"1% auto"} fontSize={"sm"}>
          {text}
        </Text>
        <Text fontWeight={"normal"} color={"grey"} fontSize={"xs"}>
          {created}
        </Text>
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
      </GridItem>
    </Grid>
  );
};

export default Question;
