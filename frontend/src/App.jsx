import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import FrontPage from "scenes/front-page/FrontPage";
import { Route, Routes } from "react-router-dom";
import DestinationSearch from "scenes/destination-search/DestinationSearch";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import Footer from "./components/Footer/Footer";
import DestinationReview from "./components/DestinationReview/DestinationReview";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="destinations" element={<DestinationSearch />} />
          <Route path="destinations/:id" element={<DestinationReview />} />
        </Routes>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
