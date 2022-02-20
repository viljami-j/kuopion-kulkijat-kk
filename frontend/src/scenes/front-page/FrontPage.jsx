import React from "react";
import { Container } from "@mui/material";
import SuggestedDestinations from "./SuggestedDestinations";
import Navbar from "components/Navbar/Navbar";
import Hero from "components/Hero/Hero";
import HeroImage from "images/hero.jpg";

const FrontPage = () => {
  return (
    <Container>
      <Navbar />
      <Hero
        imageSrc={HeroImage}
        header={"Tervetuloa kulkemaan kanssamme"}
        caption={
          "Tutustu maailmaan yhdessä tuhansien käyttäjiemme kanssa. Älä kulje enää yksin. Ota Kuopion Kulkijat mukaasi."
        }
      />
      <SuggestedDestinations />
    </Container>
  );
};

export default FrontPage;
