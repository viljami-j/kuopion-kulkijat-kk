import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import LocationIndicator from "./LocationIndicator";

DestinationCard.defaultProps = {
  imageSrc: "",
};

DestinationCard.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string,
  imageSrc: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
};

function DestinationCard({ header, content, imageSrc, location }) {
  return (
    <Card>
      {imageSrc ? (
        <CardMedia
          component="img"
          height="174"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width={225}
          height={174}
          animation={false}
        />
      )}
      <CardHeader title={header} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <LocationIndicator location={location} />
      </CardContent>
    </Card>
  );
}

export default DestinationCard;
