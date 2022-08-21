import React from "react";
import { Flex, Button, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Profile = () => {
  const { data: session } = useSession();
  const formattedDate = new Date(session.user.created).toLocaleDateString();
  return (
    <Flex m={"2%"} w={"100%"} flexDirection={"column"}>
      <Flex w={"100%"} flexDirection={"row"} justifyContent={"space-between"}>
        <Flex w={"70%"} flexDirection={"row"} justifyContent={"flex-start"}>
          <Image
            width="100%"
            height="100%"
            quality={100}
            alt={"avatar"}
            src={session.user.profilePhoto}
          />
          <Flex
            paddingLeft={"5%"}
            justifyContent={"flex-start"}
            flexDirection={"column"}
          >
            <Text fontSize={"xl"}>{session.user.username}</Text>
            <Text fontSize={"sm"}>Member since {formattedDate}</Text>
          </Flex>
        </Flex>
        <Flex
          justifySelf={"flex-end"}
          justifyContent={"flex-start"}
          flexDirection={"column"}
        >
          <Button fontWeight={"normal"} variant={"outline"}>
            Edit Profile
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
