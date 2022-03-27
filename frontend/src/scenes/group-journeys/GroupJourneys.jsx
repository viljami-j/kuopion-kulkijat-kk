import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Grid, Button, Typography, CircularProgress } from "@mui/material";
import LocationIndicator from "components/DestinationCard/LocationIndicator";
import useJourneys from "util/hooks/useJourneys";
import { useState } from "react";

export default function GroupJourneys() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [showLoadButton, setShowLoadButton] = useState(true);
  const { journeys, isLoadingJourneys, JourneyLoadingSnackbar } = useJourneys();

  const SHOW_MORE_JOURNEYS_INCREASE_BY = 8;

  function showMoreJourneys() {
    if (visibleCount < journeys.length) {
      setVisibleCount(visibleCount + SHOW_MORE_JOURNEYS_INCREASE_BY);
    } else {
      setShowLoadButton(false);
    }
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
          <ImageList rowHeight={200} cols={4} gap={6} sx={{ width: "800px" }}>
            {journeys.slice(0, visibleCount).map((item) => (
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
        {showLoadButton && journeys.length != 0 ? (
          <Button variant="contained" onClick={showMoreJourneys}>
            Näytä lisää
          </Button>
        ) : null}
        <JourneyLoadingSnackbar />
      </Grid>
    </Grid>
  );
}
