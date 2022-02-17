import { useState } from "react";
import { CssBaseline, ThemeProvider, Button } from "@mui/material";
import { theme } from "theme";
import Navbar from "components/Navbar/Navbar.jsx";
import useCurrentUser from "./hooks/useCurrentUser";

function Rekisterointi() {
  const [newUser, setNewUser] = useState(""); // setNewUser vaihtaa kirjautuneen käyttäjänimen
  const currentUser = useCurrentUser(newUser);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar loggedInName={currentUser} />
      <h1>Rekisteröinti</h1>
      <Button
        onClick={() => {
          setNewUser("Testi Testinen");
        }}
      >
        rekisteröi käyttäjänimi "Testi Testinen"
      </Button>
    </ThemeProvider>
  );
}

export default Rekisterointi;
