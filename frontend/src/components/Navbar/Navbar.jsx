import { AppBar, Box, Toolbar } from "@mui/material";
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
  return (
    <div>
      <Box>
        <AppBar elevation={0} color="transparent" position="static">
          <Toolbar disableGutters>
            <StyledLink href="/">Kuopion Kulkijat</StyledLink>
            <NavbarButtons loggedInName={loggedInName} />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
