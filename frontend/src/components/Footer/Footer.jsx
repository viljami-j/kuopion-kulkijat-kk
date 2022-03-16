import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", mb: 6, mt: 20 }}
      component={"footer"}
    >
      <Box>
        <Typography fontWeight="medium">Kuopion Kulkijat</Typography>
        <Typography>Älä kulje yksin</Typography>
      </Box>
      <Box>
        <Typography fontWeight="medium">Tekijät</Typography>
        <Typography>Eetu Ollanketo</Typography>
        <Typography>Viljami Mäkelä</Typography>
        <Typography>Artturi Toivainen</Typography>
        <Typography>Arttu Olli</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
