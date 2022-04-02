import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import useDestinations from "../../util/hooks/useDestinations";
import { isEmpty } from "lodash";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { theme } from "../../theme";

export const StoryPropType = {
  id: PropTypes.number,
  destinationId: PropTypes.number,
  date: PropTypes.string,
  text: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

StoryCard.propTypes = StoryPropType;

function StoryCard({ destinationId, date, text, images }) {
  const { destinations: destination, isLoadingDestinations } =
    useDestinations(destinationId);

  const isSmallWidth = useMediaQuery(theme.breakpoints.down("sm"));

  const destinationName = !isEmpty(destination) ? destination.kohdenimi : "";
  const directionOfImages = isSmallWidth ? "column" : "row";

  return (
    <>
      {isLoadingDestinations ? (
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
            <ImageList
              gap={16}
              sx={{ display: "flex", flexDirection: directionOfImages }}
            >
              <ImageListItem sx={{ width: "100%" }}>
                <img
                  src={
                    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
                  }
                  alt="Test"
                  loading="lazy"
                  style={{ borderRadius: "10px" }}
                />
              </ImageListItem>
              <ImageListItem sx={{ width: "100%" }}>
                <img
                  src={
                    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
                  }
                  alt="Test"
                  loading="lazy"
                  style={{ borderRadius: "10px" }}
                />
              </ImageListItem>
            </ImageList>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default StoryCard;
