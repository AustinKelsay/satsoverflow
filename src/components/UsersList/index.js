import React from "react";
import Link from "next/link";
import { Grid, GridItem } from "@chakra-ui/react";

const UsersList = ({ users }) => {
  console.log(users);
  return (
    <div>
      <h1>Users List</h1>
      <Grid templateColumns="5% 1fr" gap={6}>
        {users.map((user) => (
          <GridItem key={user.id}>
            <Link href={`/users/${user.id}`}>
              <a>{user.username}</a>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default UsersList;
