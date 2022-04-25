import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import FrontPage from "scenes/front-page/FrontPage";
import { Route, Routes } from "react-router-dom";
import DestinationSearch from "scenes/destination-search/DestinationSearch";
import GroupJourneys from "scenes/group-journeys/GroupJourneys";
import Navbar from "./components/Navbar/Navbar";
import React, { useState } from "react";
import Footer from "./components/Footer/Footer";
import DestinationReview from "./components/DestinationReview/DestinationReview";
import { LoginContext } from "./util/loginContext";
import MyJourneys from "scenes/my-journeys/MyJourneys";
import JourneyReview from "./scenes/journey-review/JourneyReview";
import Users from "./scenes/users/Users";
import UserDetails from "./scenes/user-details/UserDetails";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";

function App() {
  const loginState = useState({
    idmatkaaja: 0,
    etunimi: "",
    sukunimi: "",
    nimimerkki: "",
    paikkakunta: "",
    esittely: "",
    email: "",
    password: "",
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <LoginContext.Provider value={loginState}>
            <Navbar />
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="destinations" element={<DestinationSearch />} />
              <Route path="destinations/:id" element={<DestinationReview />} />
              <Route path="group_journeys" element={<GroupJourneys />} />
              <Route path="my_journeys" element={<MyJourneys />} />
              <Route path="journey/:id" element={<JourneyReview />} />
            </Routes>
            <Footer />
          </LoginContext.Provider>
        </LocalizationProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
