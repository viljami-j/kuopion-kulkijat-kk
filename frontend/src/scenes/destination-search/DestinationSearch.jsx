import React, { useMemo, useState } from "react";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import DestinationCardGrid from "components/DestinationCardGrid";
import useDestinations from "../../util/hooks/useDestinations";

function DestinationSearch() {
  const { destinations, isLoadingDestinations, DestinationLoadingSnackbar } =
    useDestinations();
  const [searchQuery, setSearchQuery] = useState("");

  function onTextFieldTyped(event) {
    setSearchQuery(event.target.value);
  }

  const searchResults = useMemo(() => {
    return destinations.filter((destination) => {
      return destination.kohdenimi
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [destinations, searchQuery]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} component={"main"}>
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
          value={searchQuery}
          onChange={onTextFieldTyped}
          sx={{
            width: "100%",
          }}
        />
      </Box>

      {isLoadingDestinations ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <DestinationCardGrid destinations={searchResults} />
      )}

      <DestinationLoadingSnackbar />
    </Box>
  );
}

export default DestinationSearch;
