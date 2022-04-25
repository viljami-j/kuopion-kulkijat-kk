import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import RegistrationDialog from "../RegistrationDialog/RegistrationDialog";
import LoginDialog from "../LoginDialog/LoginDialog";
import { LoginContext } from "../../util/loginContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import { useToggle } from "@react-hookz/web";
import useMessage from "../../util/hooks/useMessage";

NavbarButtons.propTypes = {
  menuToggle: PropTypes.func,
};

export default function NavbarButtons({ menuToggle }) {
  const [registrationDialogOpen, toggleRegistrationDialog] = useToggle();
  const [loginDialogOpen, toggleLoginDialog] = useToggle();
  const [loginData, _] = useContext(LoginContext);
  const { MessageSnackbar, showMessage } = useMessage();

  if (loginData.email)
    return (
      <>
        <Button
          component={RouterLink}
          to="/my_journeys"
          sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
          color="primary"
        >
          Omat matkat
        </Button>
        <Button
          component={RouterLink}
          to="/users"
          sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
          color="primary"
          onClick={menuToggle}
        >
          Jäsenet
        </Button>
        <Button
          component={RouterLink}
          to="/group_journeys"
          sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
          color="primary"
          onClick={menuToggle}
        >
          Porukan matkat
        </Button>
        <Button
          component={RouterLink}
          to="destinations"
          sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
          color="primary"
          onClick={menuToggle}
        >
          Matkakohteet
        </Button>
        <Button
          component={RouterLink}
          to={`/users/${loginData.idmatkaaja}`}
          sx={{ fontSize: 14, mr: 2 }}
          color="primary"
          onClick={menuToggle}
        >
          {loginData.email}
        </Button>
      </>
    );
  return (
    <>
      <Button
        component={RouterLink}
        to="destinations"
        sx={{ mr: 2, fontSize: 14, fontWeight: "light" }}
        color="primary"
        onClick={menuToggle}
      >
        Matkakohteet
      </Button>
      <Button
        sx={{ mr: 2, fontSize: 14 }}
        color="primary"
        onClick={() => toggleLoginDialog()}
      >
        Kirjaudu sisään
      </Button>
      <Button
        sx={{ fontSize: 14, mr: 2 }}
        variant="contained"
        color="primary"
        onClick={() => toggleRegistrationDialog()}
      >
        Rekisteröidy
      </Button>
      <RegistrationDialog
        open={registrationDialogOpen}
        toggle={() => toggleRegistrationDialog()}
      />
      <LoginDialog
        open={loginDialogOpen}
        toggle={() => toggleLoginDialog()}
        showMessage={showMessage}
      />
      <MessageSnackbar />
    </>
  );
}
