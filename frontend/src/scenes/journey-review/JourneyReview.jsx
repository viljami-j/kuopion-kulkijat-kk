import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryCard from "../../components/JourneyCard/StoryCard";
import { Box } from "@mui/system";
import useMessage from "../../util/hooks/useMessage";
import { useAsyncAbortable, useMountEffect } from "@react-hookz/web";
import { makeGetRequest } from "../../util/makeApiRequest";
import endpoints from "../../util/endpoints";

function JourneyReview() {
  const { id } = useParams();
  const { MessageSnackbar, showMessage } = useMessage();
  const [journey, setJourney] = useState({});
  const [journeyFetchState, fetchJourneys] = useAsyncAbortable(
    async (signal) => {
      const journeys = await makeGetRequest(`${endpoints.JOURNEYS}/${id}`)(
        "",
        signal
      );

      if (Array.isArray(journeys)) {
        setJourney(journeys[0]);
      }
    }
  );

  const startDate = new Date(journey.startDate).toLocaleDateString();
  const endDate = new Date(journey.endDate).toLocaleDateString();

  useEffect(() => {
    if (journeyFetchState.error) {
      showMessage(
        "Verkkovirhe haettaessa matkan tietoja. Yritä myöhemmin uudelleen."
      );
    }
  }, [journeyFetchState.error, showMessage]);

  useMountEffect(fetchJourneys.execute);

  return (
    <>
      <Typography
        variant="h1"
        sx={{ my: 4 }}
      >{`Matkakertomus ${startDate} - ${endDate}`}</Typography>
      {journeyFetchState.status === "loading" ? (
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
          {journey.stories &&
            journey.stories.map((story) => (
              <StoryCard {...story} key={story.date} />
            ))}
        </Box>
      )}
      <MessageSnackbar />
    </>
  );
}

export default JourneyReview;
