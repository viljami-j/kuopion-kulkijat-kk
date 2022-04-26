import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../theme";
import useMessage from "../../util/hooks/useMessage";
import endpoints from "../../util/endpoints";
import { makeGetRequest } from "../../util/makeApiRequest";
import { useAsyncAbortable, useMountEffect } from "@react-hookz/web";
import { TravelExplore } from "@mui/icons-material";

export default function GroupJourneys() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [showLoadButton, setShowLoadButton] = useState(true);
  const [journeyFetchState, fetchJourneys] = useAsyncAbortable(
    async (signal) => {
      const journeys = await makeGetRequest(endpoints.JOURNEYS)("", signal);

      if (Array.isArray(journeys)) {
        setJourneys(journeys);
      }
    }
  );
  const isMediumWidth = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallWidth = useMediaQuery(theme.breakpoints.down("sm"));
  const [journeys, setJourneys] = useState([]);
  const { MessageSnackbar, showMessage } = useMessage();

  const SHOW_MORE_JOURNEYS_INCREASE_BY = 8;

  function showMoreJourneys() {
    if (visibleCount < journeys.length) {
      setVisibleCount(visibleCount + SHOW_MORE_JOURNEYS_INCREASE_BY);
      if (visibleCount + SHOW_MORE_JOURNEYS_INCREASE_BY > journeys.length)
        setShowLoadButton(false);
    }
  }

  function calculateGridColumns() {
    if (isSmallWidth) {
      return 1;
    } else if (isMediumWidth) {
      return 2;
    }
    return 4;
  }

  useEffect(() => {
    if (journeyFetchState.error) {
      showMessage("Verkkovirhe haettaessa matkoja. Yritä myöhemmin uudelleen.");
    }
  }, [journeyFetchState.error, showMessage]);

  useMountEffect(fetchJourneys.execute);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={4}
      sx={{ mt: "80px" }}
    >
      <Grid item xs={12}>
        <Typography variant="h1">Porukan matkat</Typography>
      </Grid>
      <Grid item xs={12}>
        {journeyFetchState.status === "loading" ? (
          <CircularProgress sx={{ mx: "auto", my: 20 }} />
        ) : (
          <List>
            {journeys.slice(0, visibleCount).map((journey) => (
              <ListItem divider key={journey.journeyId} button>
                <ListItemIcon>
                  <TravelExplore />
                </ListItemIcon>
                <ListItemText
                  primary={journey.author}
                  secondary={`${journey.startDate} - ${journey.endDate}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
      <Grid item xs={12}>
        {showLoadButton ? (
          <Button variant="contained" onClick={showMoreJourneys}>
            Näytä lisää
          </Button>
        ) : null}
        <MessageSnackbar />
      </Grid>
    </Grid>
  );
}
