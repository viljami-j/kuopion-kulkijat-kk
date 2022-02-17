import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import Navbar from "components/Navbar/Navbar.jsx";
import useCurrentUser from "hooks/useCurrentUser";

function PorukanMatkat() {
  const [newUser, setNewUser] = useState(""); // setNewUser vaihtaa kirjautuneen käyttäjänimen
  const currentUser = useCurrentUser(newUser);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar loggedInName={currentUser} />
      <h1>Porukan Matkat</h1>
    </ThemeProvider>
  );
}

export default PorukanMatkat;
