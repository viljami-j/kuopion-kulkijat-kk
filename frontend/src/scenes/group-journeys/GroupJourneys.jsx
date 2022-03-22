import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Grid, Button, Typography } from "@mui/material";
import LocationIndicator from "components/DestinationCard/LocationIndicator";
import { useState, useEffect } from "react";

export default function GroupJourneys() {
  const [journeys, setJourneys] = useState([]);

  function showMoreJourneys() {
    // setNumberOfDestinations((previousValue) =>
    //   Math.min(destinations.length, previousValue + DESTINATIONS_PER_ROW)
    // );
    alert("Näytetään lisää!");
  }

  useEffect(() => {
    setJourneys([
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        author: "Miska Jämsä",
        location: { city: "Kuopio", country: "Finland" },
      },
    ]);
  }, []);

  // fetch("src/test-data/testJourneys.json")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

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
        <ImageList
          rowHeight={200}
          cols={4}
          gap={6}
          sx={{ width: "800px", height: "406px" }}
        >
          {journeys.map((item) => (
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
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={showMoreJourneys}>
          Näytä lisää
        </Button>
      </Grid>
    </Grid>
  );
}
