import {
  AppBar,
  IconButton,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import NavbarButtons from "./NavbarButtons";
import PropTypes from "prop-types";
import StyledLink from "./styled/StyledLink";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

Navbar.defaultProps = {
  loggedInName: "",
};

Navbar.propTypes = {
  loggedInName: PropTypes.string,
};

export default function Navbar({ loggedInName }) {
  const trigger = useScrollTrigger();
  const location = useLocation();
  const navigate = useNavigate();

  const shouldEnableBackNavigation = new RegExp(/\/destinations\/\d/).test(
    location.pathname
  );

  return (
    <>
      <Slide appear={false} direction={"down"} in={!trigger}>
        <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            {shouldEnableBackNavigation ? (
              <IconButton
                aria-label="Navigoi takaisin"
                onClick={() => navigate(-1)}
              >
                <ArrowBack sx={{ color: "black", mr: 1 }} />
              </IconButton>
            ) : null}
            <StyledLink to="/" component={Link}>
              Kuopion Kulkijat
            </StyledLink>
            <NavbarButtons loggedInName={loggedInName} />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}
