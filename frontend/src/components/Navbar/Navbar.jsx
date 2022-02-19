import { AppBar, Box, Link, Toolbar } from "@mui/material";
import NavbarButtons from "./NavbarButtons";
import PropTypes from "prop-types";

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
          <Toolbar sx={{ mr: 5 }}>
            <Link
              href="/"
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: "medium",
                textDecoration: "none",
                color: "black",
              }}
            >
              ⠀⠀⠀ Kuopion Kulkijat
              {/* Hacky fix using invisible characters to get the text in right place - couldn't apply margin, probably something to do with flex */}
            </Link>
            {<NavbarButtons loggedInName={loggedInName} />}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
