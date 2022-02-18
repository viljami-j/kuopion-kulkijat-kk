import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

export default function NavbarButtons({ loggedInName }) {
  NavbarButtons.defaultProps = {
    loggedInName: "",
  };

  NavbarButtons.propTypes = {
    loggedInName: PropTypes.string,
  };
  if (loggedInName)
    return (
      <div>
        <Button
          component={RouterLink}
          to="/jasenet"
          sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
          color="primary"
        >
          Jäsenet
        </Button>
        <Button
          component={RouterLink}
          to="/porukan_matkat"
          sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
          color="primary"
        >
          Porukan matkat
        </Button>
        <Button
          component={RouterLink}
          to="/matkakohteet"
          sx={{ mr: 2, fontSize: 14 }}
          color="primary"
        >
          Matkakohteet
        </Button>
        <Button
          component={RouterLink}
          to="/omat_tiedot"
          sx={{ mr: 2, fontSize: 14 }}
          color="primary"
        >
          {loggedInName}
        </Button>
      </div>
    );
  return (
    <div>
      <Button
        component={RouterLink}
        to="/matkakohteet"
        sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
        color="primary"
      >
        Matkakohteet
      </Button>
      <Button sx={{ mr: 2, fontSize: 14 }} color="primary">
        Kirjaudu sisään
      </Button>
      <Button
        component={RouterLink}
        to="/rekisterointi"
        sx={{ mr: 2, fontSize: 14 }}
        variant="contained"
        color="primary"
      >
        Rekisteröidy
      </Button>
    </div>
  );
}
