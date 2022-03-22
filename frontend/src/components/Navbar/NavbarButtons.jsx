import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import useToggle from "../../util/hooks/useToggle";
import RegistrationDialog from "../RegistrationDialog/RegistrationDialog";
import LoginDialog from "../LoginDialog/LoginDialog";

NavbarButtons.defaultProps = {
  loggedInName: "",
};

NavbarButtons.propTypes = {
  loggedInName: PropTypes.string,
};

export default function NavbarButtons({ loggedInName }) {
  const [registrationDialogOpen, toggleRegistrationDialog] = useToggle();
  const [loginDialogOpen, toggleLoginDialog] = useToggle();

  if (loggedInName)
    return (
      <div>
        <Button
          component={RouterLink}
          to="/members"
          sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
          color="primary"
        >
          Jäsenet
        </Button>
        <Button
          component={RouterLink}
          to="/group_journeys"
          sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
          color="primary"
        >
          Porukan matkat
        </Button>
        <Button
          component={RouterLink}
          to="destinations"
          sx={{ mr: 2, fontSize: 14 }}
          color="primary"
        >
          Matkakohteet
        </Button>
        <Button
          component={RouterLink}
          to="/omat_tiedot"
          sx={{ fontSize: 14 }}
          color="primary"
        >
          {loggedInName}
        </Button>
      </div>
    );
  return (
    <>
      <Button
        component={RouterLink}
        to="destinations"
        sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
        color="primary"
      >
        Matkakohteet
      </Button>
      <Button
        sx={{ mr: 2, fontSize: 14 }}
        color="primary"
        onClick={toggleLoginDialog}
      >
        Kirjaudu sisään
      </Button>
      <Button
        sx={{ fontSize: 14 }}
        variant="contained"
        color="primary"
        onClick={toggleRegistrationDialog}
      >
        Rekisteröidy
      </Button>
      <RegistrationDialog
        open={registrationDialogOpen}
        toggle={toggleRegistrationDialog}
      />
      <LoginDialog open={loginDialogOpen} toggle={toggleLoginDialog} />
    </>
  );
}
