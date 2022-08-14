import Sidebar from "../src/components/Sidebar";
import Header from "../src/components/Header";
import QuestionsList from "../src/components/Questions/QuestionsList";
import UsersList from "../src/components/UsersList";
import { Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Home({ questions, users }) {
  const view = useSelector((state) => state.view.currentView);
  switch (view) {
    case "Questions":
      return (
        <div>
          <QuestionsList questions={questions} />
        </div>
      );
    case "Users":
      return (
        <div>
          <UsersList users={users} />
        </div>
      );
    default:
      return <div>loading</div>;
  }
}

export async function getServerSideProps() {
  const questionsRes = await fetch("http://localhost:3000/api/questions");
  const usersRes = await fetch("http://localhost:3000/api/users");
  const questions = await questionsRes.json();
  const users = await usersRes.json();
  return {
    props: {
      questions,
      users,
    },
  };
}
