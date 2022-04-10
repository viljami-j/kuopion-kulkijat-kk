import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DestinationCardGrid from "../../components/DestinationCardGrid";
import { makeGetRequest } from "../../util/makeApiRequest";
import endpoints from "../../util/endpoints";
import useMessage from "../../util/hooks/useMessage";
import { useAsyncAbortable, useMountEffect } from "@react-hookz/web";

const DESTINATIONS_PER_ROW = 4;

function SuggestedDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [dataFetchState, fetchDestinations] = useAsyncAbortable(
    async (signal) => {
      const destinations = await makeGetRequest(endpoints.DESTINATIONS)(
        "",
        signal
      );
      setDestinations(destinations);
    }
  );
  const { MessageSnackbar, showMessage } = useMessage();
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

  useEffect(() => {
    if (dataFetchState.error) {
      showMessage(
        "Verkkovirhe haettaessa matkakohteita. Yritä myöhemmin uudelleen."
      );
    }
  }, [dataFetchState.error, showMessage]);

  useMountEffect(fetchDestinations.execute);

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

      {dataFetchState.loading ? (
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

      <MessageSnackbar />
    </Box>
  );
}

export default SuggestedDestinations;
