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
import Users from "./scenes/users/Users";

function App() {
  const loginState = useState({ email: "", password: "" });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <LoginContext.Provider value={loginState}>
          <Navbar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="destinations" element={<DestinationSearch />} />
            <Route path="destinations/:id" element={<DestinationReview />} />
            <Route path="group_journeys" element={<GroupJourneys />} />
            <Route path="my_journeys" element={<MyJourneys />} />
          </Routes>
          <Footer />
        </LoginContext.Provider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
