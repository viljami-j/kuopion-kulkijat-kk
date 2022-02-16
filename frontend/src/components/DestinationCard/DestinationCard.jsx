import React from "react";
import {
  CardActionArea,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import LocationIndicator from "./LocationIndicator";
import DestinationStyledCard from "./styled/DestinationStyledCard";
import DestinationCardImage from "./styled/DestinationCardImage";

DestinationCard.defaultProps = {
  image: "",
};

export const DestinationPropType = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
};

DestinationCard.propTypes = DestinationPropType;

function DestinationCard({ name, description, image, city, country }) {
  const displayedContent = takeMaxFortyCharacters(description);
  return (
    <DestinationStyledCard>
      <CardActionArea>
        {image ? (
          <DestinationCardImage
            component="img"
            height="174"
            width="225"
            image={image}
            alt={name}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={225}
            height={174}
            animation={false}
            sx={{ mx: "auto", my: 1 }}
          />
        )}
        <CardHeader
          title={name}
          titleTypographyProps={{
            component: "h3",
            fontWeight: "medium",
            textAlign: "start",
          }}
          sx={{ pb: 0 }}
        />
        <CardContent sx={{ pt: 1, pb: 2, textAlign: "start" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "2.86rem" }}
          >
            {displayedContent}
          </Typography>
          <LocationIndicator location={{ city, country }} />
        </CardContent>
      </CardActionArea>
    </DestinationStyledCard>
  );
}

function takeMaxFortyCharacters(content) {
  return content.length < 40 ? content : content.slice(0, 40) + " ...";
}

export default DestinationCard;
