import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import generateDestinationCardsFromDestinationData from "util/generateDestinationCardsFromDestinationData";
import { DestinationPropType } from "components/DestinationCard/DestinationCard";
import { makeGetRequest } from "../../util/makeApiRequest";
import useMessage from "../../util/hooks/useMessage";
import useToggle from "../../util/hooks/useToggle";

const DESTINATIONS_PER_ROW = 4;

function SuggestedDestinations() {
  const [suggestedDestinations, setSuggestedDestinations] = useState([]);
  const [numberOfDestinations, setNumberOfDestinations] =
    useState(DESTINATIONS_PER_ROW);
  const [isLoading, toggleLoading] = useToggle(true);
  const { MessageSnackbar, showMessage } = useMessage();

  useEffect(
    function fetchSuggestedDestinations() {
      async function fetchData() {
        try {
          const destinations = await makeGetRequest("/destinations")(null);
          setSuggestedDestinations(destinations);
          toggleLoading();
        } catch (error) {
          showMessage(
            `Verkkovirhe haettaessa matkakohteita. Yritä myöhemmin uudelleen.`
          );
        }
      }

      fetchData();
    },
    [showMessage, toggleLoading]
  );

  function calculateDisplayedDestinations() {
    return suggestedDestinations.slice(
      0,
      Math.min(numberOfDestinations, suggestedDestinations.length)
    );
  }

  function showMoreDestinations() {
    setNumberOfDestinations((previousValue) =>
      Math.min(
        suggestedDestinations.length,
        previousValue + DESTINATIONS_PER_ROW
      )
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

      {isLoading ? (
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

      <MessageSnackbar />
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
