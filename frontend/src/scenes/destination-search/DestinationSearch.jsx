import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import DestinationCardGrid from "../../components/DestinationCardGrid";
import testDestinations from "test-data/testDestinations.json";

function DestinationSearch() {
  return (
    <Box>
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
      <DestinationCardGrid destinations={testDestinations} />
    </Box>
  );
}

export default DestinationSearch;
