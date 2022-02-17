import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

/**
 * Component Properties:
 *
 * ----------------------------------------------------------------------------------------------------------------------
 * property: loggedInName
 *
 * description:
 * Displays name of the logged in user in appropriate places
 *
 * functional description:
 * When this property contains a truthy value, it's assumed that a user is logged in - causing respective changes to take place.
 * ----------------------------------------------------------------------------------------------------------------------
 *
 *
 */

export default function Navbar(props) {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const navigate = useNavigate();
  const changePage = (toURL) => {
    navigate(toURL, { state: { username: props.loggedInName } });
  };

  const btnMatkakohteet = () => {
    const style = props.loggedInName
      ? { mr: 2 }
      : { mr: 2, fontWeight: "light" };
    return (
      <Button
        onClick={() => {
          changePage("/matkakohteet");
        }}
        sx={style}
        color="primary"
      >
        Matkakohteet
      </Button>
    );
  };

  const buttonsLoggedOut = () => {
    return (
      <div>
        {btnMatkakohteet()}
        <Button
          onClick={() => {
            setShowLoginDropdown(!showLoginDropdown);
          }}
          sx={{ mr: 2 }}
          color="primary"
        >
          Kirjaudu sisään
        </Button>
        <Button sx={{ mr: 2 }} variant="contained" color="primary">
          <Link
            to="/rekisterointi"
            style={{ textDecoration: "none", color: "white" }}
          >
            Rekisteröidy
          </Link>
        </Button>
      </div>
    );
  };

  const buttonsLoggedIn = () => {
    return (
      <div>
        <Button
          onClick={() => {
            changePage("/jasenet");
          }}
          sx={{ mr: 2, fontWeight: "light" }}
          color="primary"
        >
          Jäsenet
        </Button>
        <Button
          onClick={() => {
            changePage("/porukan_matkat");
          }}
          sx={{ mr: 2, fontWeight: "light" }}
          color="primary"
        >
          Porukan matkat
        </Button>
        {btnMatkakohteet()}
        <Button
          onClick={() => {
            changePage("/omat_tiedot");
          }}
          sx={{ mr: 2 }}
          color="primary"
        >
          {props.loggedInName}
        </Button>
      </div>
    );
  };

  const navButtons = props.loggedInName
    ? buttonsLoggedIn()
    : buttonsLoggedOut();

  return (
    <div>
      <Box>
        <AppBar elevation={0} color="transparent" position="static">
          <Toolbar sx={{ mr: 5 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "medium" }}
            >
              ⠀⠀⠀
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  changePage("/");
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                Kuopion Kulkijat
              </a>
              {/* Typographyn sisällössä pieni hack, jotta tekstin sai oikeaan paikkaan - jos parempi keino löytyy niin muutetaan */}
            </Typography>
            {navButtons}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
