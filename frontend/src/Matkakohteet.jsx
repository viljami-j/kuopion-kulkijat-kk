import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import Navbar from "components/Navbar/Navbar.jsx";
import useCurrentUser from "hooks/useCurrentUser";

function Matkakohteet() {
  const [newUser, setNewUser] = useState(""); // setNewUser vaihtaa kirjautuneen käyttäjänimen
  const currentUser = useCurrentUser(newUser);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar loggedInName={currentUser} />
      <h1>Matkakohteet</h1>
      <h2>State user: {currentUser}</h2>
    </ThemeProvider>
  );
}

export default Matkakohteet;
