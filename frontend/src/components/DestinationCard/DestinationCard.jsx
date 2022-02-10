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
  const displayedContent = takeMaxFortyCharacters(content);
  return (
    <DestinationStyledCard>
      <CardActionArea>
        {imageSrc ? (
          <DestinationCardImage
            component="img"
            height="174"
            width="225"
            image={imageSrc}
            alt="Paella dish"
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
          title={header}
          titleTypographyProps={{
            component: "h3",
            fontWeight: "medium",
          }}
          sx={{ pb: 0 }}
        />
        <CardContent sx={{ pt: 1, pb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {displayedContent}
          </Typography>
          <LocationIndicator location={location} />
        </CardContent>
      </CardActionArea>
    </DestinationStyledCard>
  );
}

function takeMaxFortyCharacters(content) {
  return content.length < 40 ? content : content.slice(0, 40) + " ...";
}

export default DestinationCard;
