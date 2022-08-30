import React, { useState } from "react";
import {
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import axios from "axios";

const QuestionForm = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === "authenticated") {
      const userData = {
        username: session.user.username,
        profilePhoto: session.user.profilePhoto,
      };

      console.log({ ...formData, author: userData });

      axios
        .post("/api/questions", { ...formData, author: userData })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Flex>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl m={"1%"}>
          <FormLabel>Title</FormLabel>
          <Input onChange={(e) => handleChange(e)} name="title" type="text" />
          <FormLabel>Description</FormLabel>
          <Textarea onChange={handleChange} name="description" type="text" />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
      {/* Create formcontrol with title and text fields */}
      {/* <form onSubmit={handleSubmit}>
            <input type="text" name="title" />
            <textarea name="text" />
            <button type="submit">Submit</button>
        </form> */}
    </Flex>
  );
};

export default QuestionForm;
