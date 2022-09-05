import React, { useState, useEffect } from "react";
import {
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Tag,
  Text,
  Select,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

const QuestionForm = ({ tags }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reveal, setReveal] = useState(false);
  const [filterState, setFilterState] = useState(tags);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
  });

  useEffect(() => {
    if (query.length > 0) {
      const filtered = tags.filter((tag) => {
        return tag.name.toLowerCase().includes(query.toLowerCase());
      });
      setFilterState(filtered);
    }
  }, [query, tags]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();

    if (status === "authenticated") {
      const userData = {
        username: session.user.username,
        profilePhoto: session.user.profilePhoto,
      };

      axios
        .post("/api/questions", { ...formData, author: userData })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    router.push("/questions");
  };

  return (
    <Flex>
      <form
        style={{ width: "80%", margin: "0 auto" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input onChange={(e) => handleChange(e)} name="title" type="text" />
          <FormLabel>Description</FormLabel>
          <Textarea onChange={handleChange} name="description" type="text" />
        </FormControl>
        <Box>
          <Text>Tags</Text>
          <Box borderRadius={"5px"} border={"1px solid #e6e6e6"}>
            {formData.tags.length ? (
              formData.tags.map((tag) => {
                return (
                  <Tag key={tag} m={"1%"}>
                    {tag}
                  </Tag>
                );
              })
            ) : (
              <Tag opacity={0} m={"1%"} />
            )}
          </Box>
          <Select
            placeholder="Select tags"
            onChange={(e) => handleTag(e.target.value)}
            w={"40%"}
          >
            {filterState.map((tag) => (
              <option key={tag.name} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </Select>
        </Box>
        <Flex
          mt={"2%"}
          w={"100%"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default QuestionForm;
