import React, { useEffect, useMemo, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import DestinationCardGrid from "components/DestinationCardGrid";
import testDestinations from "test-data/testDestinations.json";

function DestinationSearch() {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(function fetchSuggestedDestinations() {
    // TODO/30: fetch destinations from the destinations context variable once the endpoint is implemented
    setTimeout(() => {
      setDestinations(testDestinations);
    }, 1000);
  }, []);

  function onTextFieldTyped(event) {
    setSearchQuery(event.target.value);
  }

  const searchResults = useMemo(() => {
    return destinations.filter((destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [destinations, searchQuery]);

  return (
    <main>
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
      <DestinationCardGrid destinations={searchResults} />
    </main>
  );
}

export default DestinationSearch;
