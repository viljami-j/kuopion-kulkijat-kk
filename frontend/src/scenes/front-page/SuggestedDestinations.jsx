import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import testDestinations from "test-data/testDestinations.json";
import * as PropTypes from "prop-types";
import generateDestinationCardsFromDestinationData from "util/generateDestinationCardsFromDestinationData";
import { DestinationPropType } from "components/DestinationCard/DestinationCard";

const DESTINATIONS_PER_ROW = 4;

function SuggestedDestinations() {
  const [suggestedDestinations, setSuggestedDestinations] = useState([]);
  const [numberOfDestinations, setNumberOfDestinations] =
    useState(DESTINATIONS_PER_ROW);

  useEffect(function fetchSuggestedDestinations() {
    // TODO/30: fetch suggestions from the backend once the endpoint is implemented
    setTimeout(() => {
      setSuggestedDestinations(testDestinations);
    }, 1000);
  }, []);

  function calculateDisplayedDestinations() {
    return suggestedDestinations.slice(0, numberOfDestinations);
  }

  function showMoreDestinations() {
    setNumberOfDestinations(
      (previousValue) => previousValue + DESTINATIONS_PER_ROW
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
    >
      <Typography variant="h2">Suosittelemme sinulle</Typography>
      <Typography>Käyttäjämme ovat nauttineet näistä kohteista</Typography>

      {isEmpty(suggestedDestinations) ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <DestinationCards destinations={calculateDisplayedDestinations()} />
      )}
      <Button
        variant="contained"
        sx={{ mx: "auto" }}
        onClick={showMoreDestinations}
      >
        Näytä lisää
      </Button>
    </Box>
  );
}

function DestinationCards({ destinations }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(251px, 1fr))",
        gridColumnGap: (theme) => theme.spacing(4),
        gridRowGap: (theme) => theme.spacing(5),
        justifyItems: "center",
        mt: 10,
        mb: 6,
      }}
    >
      {generateDestinationCardsFromDestinationData(destinations)}
    </Box>
  );
}

DestinationCards.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.shape(DestinationPropType)),
};

export default SuggestedDestinations;
