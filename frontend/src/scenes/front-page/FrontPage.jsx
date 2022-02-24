import React from "react";
import SuggestedDestinations from "./SuggestedDestinations";
import Hero from "components/Hero/Hero";
import HeroImage from "images/hero.jpg";

const FrontPage = () => {
  return (
    <main>
      <Hero
        imageSrc={HeroImage}
        header={"Tervetuloa kulkemaan kanssamme"}
        caption={
          "Tutustu maailmaan yhdessä tuhansien käyttäjiemme kanssa. Älä kulje enää yksin. Ota Kuopion Kulkijat mukaasi."
        }
      />
      <SuggestedDestinations />
    </main>
  );
};

export default FrontPage;
