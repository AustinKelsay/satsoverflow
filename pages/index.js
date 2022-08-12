import Sidebar from "../src/components/Sidebar";
import Header from "../src/components/Header";
import QuestionsList from "../src/components/Questions/QuestionsList";
import { Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Home({ questions }) {
  const view = useSelector((state) => state.view.currentView);

  return (
    <div>
      {view === "Questions" ? <QuestionsList questions={questions} /> : null}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/questions");
  const questions = await res.json();
  return {
    props: {
      questions,
    },
  };
}
