import React from "react";
import { Container } from "@mui/material";
import SuggestedDestinations from "./SuggestedDestinations";
import Footer from "../../components/Footer/Footer";

const FrontPage = () => {
  return (
    <Container>
      <SuggestedDestinations />
      <Footer />
    </Container>
  );
};

export default FrontPage;
