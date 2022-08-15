import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";

const UsersList = ({ users }) => {
  console.log(users);
  return (
    <div>
      <Text
        borderBottom={"1px solid #e6e6e6"}
        paddingLeft={"2%"}
        margin={"2% auto"}
        fontSize={"3xl"}
      >
        Users
      </Text>
      <Flex wrap="wrap" justifyContent="flex-start" margin="2% auto">
        {users.map((user) => (
          <Flex
            justifyContent={"space-between"}
            flexDirection={"row"}
            marginLeft={"2%"}
            w="15%"
            h="20%"
            key={user.id}
          >
            <Link href={`/users/${user.id}`}>
              <Image
                width="60%"
                height="40%"
                quality={100}
                src={user.profilePhoto}
                alt={user.name}
              />
            </Link>
            <Flex flexDirection={"column"} justifyContent={"space-between"}>
              <Link href={`/users/${user.id}`}>
                <Text cursor={"pointer"} color={"#0000EE"}>
                  {user.username}
                </Text>
              </Link>
              <Text fontSize={"xs"}>Questions: 1</Text>
              <Text fontSize={"xs"}>Answers: 1</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default UsersList;
