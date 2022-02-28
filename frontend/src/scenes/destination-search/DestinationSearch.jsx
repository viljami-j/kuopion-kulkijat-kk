import React from "react";
import { Box, TextField, Typography } from "@mui/material";

function DestinationSearch() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        mt: 8,
        width: "100%",
      }}
    >
      <Typography variant={"h1"} sx={{ mb: 7 }}>
        Matkakohdehaku
      </Typography>
      <TextField
        id={"destination-search-field"}
        label={"Etsi matkakohdetta"}
        variant={"outlined"}
        sx={{
          width: "100%",
        }}
      />
    </Box>
  );
}

export default DestinationSearch;
