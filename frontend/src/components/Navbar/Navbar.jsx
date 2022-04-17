import {
  AppBar,
  IconButton,
  Slide,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, Menu } from "@mui/icons-material";
import StyledLink from "./styled/StyledLink";
import NavbarButtons from "./NavbarButtons";
import { theme } from "../../theme";
import React from "react";
import { HamburgerMenu } from "./HamburgerMenu";
import { useToggle } from "@react-hookz/web";

export default function Navbar() {
  const trigger = useScrollTrigger();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [hamburgerMenuOpen, toggleHamburgerMenu] = useToggle();

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
            {isMobile ? (
              <IconButton aria-label="Valikko" onClick={toggleHamburgerMenu}>
                <Menu color="primary" />
              </IconButton>
            ) : (
              <NavbarButtons />
            )}
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
      <HamburgerMenu open={hamburgerMenuOpen} onClose={toggleHamburgerMenu} />
    </>
  );
}
