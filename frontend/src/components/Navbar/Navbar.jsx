import { AppBar, Slide, Toolbar, useScrollTrigger } from "@mui/material";
import NavbarButtons from "./NavbarButtons";
import PropTypes from "prop-types";
import StyledLink from "./styled/StyledLink";

Navbar.defaultProps = {
  loggedInName: "",
};

Navbar.propTypes = {
  loggedInName: PropTypes.string,
};

export default function Navbar({ loggedInName }) {
  const trigger = useScrollTrigger();

  return (
    <>
      <Slide appear={false} direction={"down"} in={!trigger}>
        <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <StyledLink href="/">Kuopion Kulkijat</StyledLink>
            <NavbarButtons loggedInName={loggedInName} />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}
