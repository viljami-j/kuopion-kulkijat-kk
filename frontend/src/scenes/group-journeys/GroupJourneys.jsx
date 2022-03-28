import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LocationIndicator from "components/DestinationCard/LocationIndicator";
import useJourneys from "util/hooks/useJourneys";
// import testData from "test-data/testJourneys.json";
import { theme } from "../../theme";

export default function GroupJourneys() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [showLoadButton, setShowLoadButton] = useState(true);
  const { journeys, isLoadingJourneys, JourneyLoadingSnackbar } = useJourneys();
  const isMediumWidth = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallWidth = useMediaQuery(theme.breakpoints.down("sm"));

  const SHOW_MORE_JOURNEYS_INCREASE_BY = 8;
  const DATA_SOURCE = journeys; // uncomment testData import & change 'journeys' to 'testData' for testing. Navigate to http://localhost:3000/group_journeys

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
                  alt={item.author}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.author}
                  subtitle={
                    <LocationIndicator location={item.location} fontsize={14} />
                  }
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
  );
}
