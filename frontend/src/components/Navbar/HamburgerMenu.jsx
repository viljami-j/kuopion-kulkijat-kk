import { Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NavbarButtons from "./NavbarButtons";
import React from "react";

export function HamburgerMenu(props) {
  return (
    <Drawer anchor="right" open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 3,
          ml: 2,
          gap: 1,
        }}
      >
        <Typography
          fontWeight="bold"
          component="h1"
          sx={{ mb: 6, alignSelf: "flex-start" }}
        >
          Valikko
        </Typography>
        <NavbarButtons loggedInName={"Arttu Olli"} menuToggle={props.onClose} />
      </Box>
    </Drawer>
  );
}
