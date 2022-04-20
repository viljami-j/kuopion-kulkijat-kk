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
import { defaultTo } from "lodash";

export default function MyJourneys() {
  const { MessageSnackbar, showMessage } = useMessage();
  const [journey, setJourney] = useState({});
  // TODO: Tämä tulee myöhemmin LoginContextista, kunhan sisäänkirjautuminen saadaan pelittämään.
  const userId = 2;
  const [journeyFetchState, fetchJourneys] = useAsyncAbortable(
    async (signal) => {
      const journeys = await makeGetRequest(
        `${endpoints.USER_JOURNEYS}/${userId}`
      )("", signal);
      setJourney(journeys);
    }
  );
  const [destinations, setDestinations] = useState([]);

  const isMediumWidth = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallWidth = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, toggleDrawer] = useToggle();
  const [loginData, _] = useContext(LoginContext);

  function calculateGridColumns() {
    if (isSmallWidth) {
      return 1;
    } else if (isMediumWidth) {
      return 2;
    }
    return 4;
  }

  useEffect(() => {
    async function asyncWrapper() {
      const destinationPromises = [];
      journey.stories.forEach((story) => {
        destinationPromises.push(
          makeGetRequest(`${endpoints.DESTINATIONS}/${story.destinationId}`)()
        );
      });
      const destinations = await Promise.all(destinationPromises);
      setDestinations(destinations);
    }

    if (journey.stories) {
      asyncWrapper();
    }
  }, [journey.stories]);

  useEffect(() => {
    if (journeyFetchState.error) {
      showMessage("Verkkovirhe haettaessa matkoja. Yritä myöhemmin uudelleen.");
    }
  }, [journeyFetchState.error, showMessage]);

  useMountEffect(fetchJourneys.execute);

  function renderStories() {
    return journey.stories.map((story, index) => {
      const destination = defaultTo(destinations[index], {
        kohdenimi: "",
        paikkakunta: "",
      });
      return (
        <ImageList
          rowHeight={200}
          cols={calculateGridColumns()}
          gap={6}
          sx={{ width: "50vw" }}
        >
          <ImageListItem key={story.storyId}>
            <ImageListItemBar
              title={destination.kohdenimi + ", " + destination.paikkakunta}
              subtitle={story.date}
            />
          </ImageListItem>
        </ImageList>
      );
    });
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
            <>{journey.stories && renderStories()}</>
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
