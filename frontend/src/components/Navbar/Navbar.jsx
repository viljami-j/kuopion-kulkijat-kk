import {
  AppBar,
  Button,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import NavbarButtons from "./NavbarButtons";
import PropTypes from "prop-types";
import StyledLink from "./styled/StyledLink";
import { Link } from "react-router-dom";
import useToggle from "../../util/hooks/useToggle";
import RegistrationDialog from "../RegistrationDialog/RegistrationDialog";

Navbar.defaultProps = {
  loggedInName: "",
};

Navbar.propTypes = {
  loggedInName: PropTypes.string,
};

export default function Navbar({ loggedInName }) {
  const trigger = useScrollTrigger();
  const [registrationDialogOpen, toggleRegistrationDialog] = useToggle();

  return (
    <>
      <Slide appear={false} direction={"down"} in={!trigger}>
        <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <StyledLink to="/" component={Link}>
              Kuopion Kulkijat
            </StyledLink>
            <NavbarButtons loggedIn={loggedInName} />
            <Button
              sx={{ fontSize: 14 }}
              variant="contained"
              color="primary"
              onClick={toggleRegistrationDialog}
            >
              Rekisteröidy
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
      <RegistrationDialog
        open={registrationDialogOpen}
        toggle={toggleRegistrationDialog}
      />
    </>
  );
}
