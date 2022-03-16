import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import useDestinations from "../../util/hooks/useDestinations";
import DestinationCardGrid from "../../components/DestinationCardGrid";

const DESTINATIONS_PER_ROW = 4;

function SuggestedDestinations() {
  const { destinations, isLoadingDestinations, DestinationLoadingSnackbar } =
    useDestinations();
  const [numberOfDestinations, setNumberOfDestinations] =
    useState(DESTINATIONS_PER_ROW);

  function calculateDisplayedDestinations() {
    return destinations.slice(
      0,
      Math.min(numberOfDestinations, destinations.length)
    );
  }

  function showMoreDestinations() {
    setNumberOfDestinations((previousValue) =>
      Math.min(destinations.length, previousValue + DESTINATIONS_PER_ROW)
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        my: 6,
      }}
      component={"section"}
    >
      <Typography variant="h2">Suosittelemme sinulle</Typography>
      <Typography>Käyttäjämme ovat nauttineet näistä kohteista</Typography>

      {isLoadingDestinations ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <DestinationCardGrid destinations={calculateDisplayedDestinations()} />
      )}
      <Button
        variant="contained"
        sx={{ mx: "auto" }}
        onClick={showMoreDestinations}
      >
        Näytä lisää
      </Button>

      <DestinationLoadingSnackbar />
    </Box>
  );
}

export default SuggestedDestinations;
