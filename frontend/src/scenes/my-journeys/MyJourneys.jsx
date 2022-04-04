import * as React from "react";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  CircularProgress,
  Fab,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useJourneys from "util/hooks/useJourneys";
import testData from "test-data/testJourneys.json";
import { theme } from "../../theme";
import useToggle from "../../util/hooks/useToggle";
import JourneyDrawer from "../../components/JourneyDrawer/JourneyDrawer";
import { LoginContext } from "../../util/loginContext";

export default function MyJourneys() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [showLoadButton, setShowLoadButton] = useState(true);
  const { journeys, isLoadingJourneys, JourneyLoadingSnackbar } = useJourneys();
  const isMediumWidth = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallWidth = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, toggleDrawer] = useToggle();
  const [loginData, _] = useContext(LoginContext);

  const SHOW_MORE_JOURNEYS_INCREASE_BY = 8;
  const DATA_SOURCE = testData; // uncomment testData import & change 'journeys' to 'testData' for testing. Navigate to http://localhost:3000/my_journeys

  function showMoreJourneys() {
    if (visibleCount < DATA_SOURCE.length) {
      setVisibleCount(visibleCount + SHOW_MORE_JOURNEYS_INCREASE_BY);
      if (visibleCount + SHOW_MORE_JOURNEYS_INCREASE_BY > DATA_SOURCE.length)
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
          {isLoadingJourneys ? (
            <CircularProgress sx={{ mx: "auto", my: 20 }} />
          ) : (
            <ImageList
              rowHeight={200}
              cols={calculateGridColumns()}
              gap={6}
              sx={{ width: "50vw" }}
            >
              {DATA_SOURCE.slice(0, visibleCount).map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.location}
                    loading="lazy"
                    style={{ overflow: "hidden" }}
                  />
                  <ImageListItemBar
                    title={item.location.city + ", " + item.location.country}
                    subtitle={item.startDate + "-" + item.endDate}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Grid>
        <Grid item xs={12}>
          {showLoadButton ? (
            <Button variant="contained" onClick={showMoreJourneys}>
              Näytä lisää
            </Button>
          ) : null}
          <JourneyLoadingSnackbar />
        </Grid>
      </Grid>

      {loginData.email ? (
        <Fab
          variant="extended"
          color="secondary"
          aria-label="addJourney"
          onClick={toggleDrawer}
          sx={{ position: "fixed", right: 30, bottom: 40 }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Lisää matka
        </Fab>
      ) : null}

      <JourneyDrawer
        open={drawerOpen}
        toggleOpen={toggleDrawer}
        header={"Uusi matkakertomus"}
      />
    </>
  );
}
