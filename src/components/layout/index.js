import React from "react";
import { Link } from "next/link";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function Layout({ children }) {
  return (
    <Grid
      templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
      gridTemplateRows={"10% 1fr 10%"}
      gridTemplateColumns={"200px 1fr"}
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
      <GridItem area={"main"}>{children}</GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}
