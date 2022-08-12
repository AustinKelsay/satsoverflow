import Sidebar from "../src/components/Sidebar";
import Header from "../src/components/Header";
import QuestionsList from "../src/components/Questions/QuestionsList";
import { Grid, GridItem } from "@chakra-ui/react";

export default function Home({ questions }) {
  return (
    <div>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={"10% 1fr 10%"}
        gridTemplateColumns={"150px 1fr"}
        h="100vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem
          style={{ position: "fixed", top: 0, left: 0, right: 0 }}
          area={"header"}
        >
          <Header />
        </GridItem>
        <GridItem style={{ borderRight: "1px solid #e6e6e6" }} area={"nav"}>
          <Sidebar />
        </GridItem>
        <GridItem area={"main"}>
          <QuestionsList questions={questions} />
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/questions");
  const questions = await res.json();
  return {
    props: {
      questions,
    },
  };
}
