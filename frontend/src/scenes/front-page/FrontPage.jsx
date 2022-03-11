import React from "react";
import { Container } from "@mui/material";
import SuggestedDestinations from "./SuggestedDestinations";
import Footer from "../../components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import Hero from "components/Hero/Hero";
import HeroImage from "images/hero.jpg";
import DestinationReview from "components/DestinationReview/DestinationReview";

const FrontPage = () => {
  return (
    <DestinationReview
      destinationName="Ounasvaara"
      imageSrc="https://www.visitrovaniemi.fi/wp-content/uploads/Ounasvaara-Ski-Centre-2-900x505.jpg"
      city="Rovaniemi"
      country="Finland"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus est eu ante maximus dapibus. Ut pharetra non massa eu condimentum. Duis at commodo nunc, nec facilisis turpis. Nam libero elit, semper vel magna nec, porttitor luctus nunc. Integer lorem neque, vulputate quis efficitur vel, tempus sed velit. Aenean vel vestibulum velit. Donec nec ullamcorper dui, sit amet faucibus sapien. Aenean vulputate rutrum sagittis. Nam vitae eros efficitur, varius libero id, tincidunt ex. Aenean sed leo velit. Fusce condimentum sem a ligula sodales feugiat. Pellentesque at nisi sit amet ex fermentum ultricies sed non quam. Nulla facilisi. Donec in luctus lorem. Fusce mattis felis eu ipsum consectetur volutpat. Integer scelerisque a purus at mattis. Vestibulum dignissim velit ac nunc pharetra, sed congue justo laoreet. Vestibulum sed massa est."
      isElevatedUser={true}
    />
  );
};

export default FrontPage;
