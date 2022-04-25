import * as React from "react";
import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  CircularProgress,
  Fab,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../theme";
import JourneyDrawer from "../../components/JourneyDrawer/JourneyDrawer";
import { LoginContext } from "../../util/loginContext";
import { useAsyncAbortable, useMountEffect, useToggle } from "@react-hookz/web";
import { makeGetRequest } from "../../util/makeApiRequest";
import useMessage from "../../util/hooks/useMessage";
import endpoints from "../../util/endpoints";

export default function MyJourneys() {
  const { MessageSnackbar, showMessage } = useMessage();
  const [journeys, setJourneys] = useState([]);
  const [loginData, _] = useContext(LoginContext);
  const [journeyFetchState, fetchJourneys] = useAsyncAbortable(
    async (signal) => {
      const journeys = await makeGetRequest(
        `${endpoints.JOURNEYS}/${loginData.idmatkaaja}`
      )("", signal);

      if (Array.isArray(journeys)) {
        setJourneys(journeys);
      }
    }
  );
  const isMediumWidth = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallWidth = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, toggleDrawer] = useToggle();

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

  function renderJourneys() {
    return journeys.map((journey, index) => (
      <ImageList
        rowHeight={200}
        cols={calculateGridColumns()}
        gap={6}
        sx={{ width: "50vw" }}
      >
        <ImageListItem key={index}>
          <ImageListItemBar
            title={`${journey.startDate} - ${journey.endDate}`}
          />
        </ImageListItem>
      </ImageList>
    ));
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={4}
        sx={{ mt: "80px" }}
      >
        <Grid item xs={12}>
          <Typography variant="h1">Omat matkat</Typography>
        </Grid>
        <Grid item xs={12}>
          {journeyFetchState.result ? (
            <CircularProgress sx={{ mx: "auto", my: 20 }} />
          ) : (
            <>{renderJourneys()}</>
          )}
        </Grid>
      </Grid>

      {loginData.email ? (
        <Fab
          variant="extended"
          color="secondary"
          aria-label="addJourney"
          onClick={() => toggleDrawer()}
          sx={{ position: "fixed", right: 30, bottom: 40 }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Lisää matka
        </Fab>
      ) : null}

      <JourneyDrawer
        open={drawerOpen}
        toggleOpen={() => toggleDrawer()}
        header={"Uusi matkakertomus"}
      />
      <MessageSnackbar />
    </>
  );
}
