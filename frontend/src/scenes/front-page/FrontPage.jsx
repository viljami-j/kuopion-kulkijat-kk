import React from "react";
import { Container } from "@mui/material";
import SuggestedDestinations from "./SuggestedDestinations";
import Navbar from "../../components/Navbar/Navbar";

const FrontPage = () => {
  return (
    <Container>
      <Navbar />
      <SuggestedDestinations />
    </Container>
  );
};

export default FrontPage;
