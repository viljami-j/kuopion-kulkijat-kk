import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import StoryCard from "../../components/JourneyCard/StoryCard";
import useJourneys from "../../util/hooks/useJourneys";
import { Box } from "@mui/system";

function JourneyReview() {
  const { id } = useParams();
  const { journeys, isLoadingJourneys, JourneyLoadingSnackbar } =
    useJourneys(id);
  const journey = journeys[0];

  const startDate = new Date(journey.startDate).toLocaleDateString();

  const endDate = new Date(journey.endDate).toLocaleDateString();

  return (
    <>
      <Typography
        variant="h1"
        sx={{ my: 4 }}
      >{`Matkakertomus ${startDate} - ${endDate}`}</Typography>
      {isLoadingJourneys ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {journey.stories.map((story) => (
            <StoryCard {...story} key={story.date} />
          ))}
        </Box>
      )}
      <JourneyLoadingSnackbar />
    </>
  );
}

export default JourneyReview;
