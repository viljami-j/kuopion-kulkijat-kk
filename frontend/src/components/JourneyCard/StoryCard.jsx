import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { theme } from "../../theme";
import { useAsyncAbortable, useMountEffect } from "@react-hookz/web";
import { makeGetRequest } from "../../util/makeApiRequest";
import endpoints from "../../util/endpoints";
import useMessage from "../../util/hooks/useMessage";

export const StoryPropType = {
  id: PropTypes.number,
  destinationId: PropTypes.number,
  date: PropTypes.string,
  text: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

StoryCard.propTypes = StoryPropType;

function StoryCard({ destinationId, date, text, images }) {
  const { MessageSnackbar, showMessage } = useMessage();
  const [destination, setDestination] = useState({});
  const [destinationFetchState, fetchDestination] = useAsyncAbortable(
    async (signal) => {
      const destinationData = await makeGetRequest(
        `${endpoints.DESTINATIONS}/${destinationId}`
      )("", signal);
      setDestination(destinationData);
    }
  );
  const isSmallWidth = useMediaQuery(theme.breakpoints.down("sm"));

  const destinationName = !isEmpty(destination) ? destination.kohdenimi : "";
  const directionOfImages = isSmallWidth ? "column" : "row";

  useEffect(() => {
    if (destinationFetchState.error) {
      showMessage("Verkkovirhe haettaessa matkaa. Yritä myöhemmin uudelleen.");
    }
  }, [destinationFetchState.error, showMessage]);

  useMountEffect(fetchDestination.execute);

  return (
    <>
      {destinationFetchState.status === "loading" ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <Card>
          <CardHeader
            title={
              <header>
                <Typography>{date}</Typography>
                <Typography variant="h2">{destinationName}</Typography>
              </header>
            }
            titleTypographyProps={{
              component: "h3",
              fontWeight: "medium",
              fontSize: "max(1rem, 1.15vw)",
              textAlign: "start",
            }}
            sx={{ pb: 0 }}
          />
          <CardContent sx={{ pt: 1, pb: 2, textAlign: "start" }}>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
        </Card>
      )}
      <MessageSnackbar />
    </>
  );
}

export default StoryCard;
