import React from "react";
import { useRouter } from "next/router";
import { FaStackOverflow } from "react-icons/fa";
import { Flex, Button, Text, Box } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);

  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      className={styles.header}
    >
      <Box
        _hover={{ opacity: 0.7, cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <FaStackOverflow size={35} color={"orange"} />
      </Box>
      {status === "authenticated" ? (
        <Flex
          alignItems={"center"}
          alignContent={"center"}
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          w={"30%"}
        >
          <Text
            onClick={() => router.push(`/profile/${session.user.username}`)}
          >
            {session.user.username}
          </Text>
          <Button
            onClick={() => signOut()}
            fontWeight={"normal"}
            variant={"outline"}
          >
            Logout
          </Button>
        </Flex>
      ) : (
        <Flex flexDirection={"row"} justifyContent={"space-evenly"} w={"20%"}>
          <Button
            onClick={() => router.push("/login")}
            fontWeight={"normal"}
            variant={"outline"}
          >
            Login
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
