import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar";
import DestinationBackgroundImage from "../PictureWrapWithGradientCover/DestinationBackgroundImage";
import LocationIndicator from "../DestinationCard/LocationIndicator";
import { Box } from "@mui/system";

DestinationReview.defaultProps = {
  imageSrc: "",
  header: "",
  city: "",
  country: "",
};

DestinationReview.propTypes = {
  imageSrc: PropTypes.string,
  header: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  description: PropTypes.string,
};

export default function DestinationReview({
  imageSrc,
  destinationName,
  city,
  country,
  description,
}) {
  return (
    <Container>
      <Navbar />
      <DestinationBackgroundImage imageSrc={imageSrc} direction={"bottomToTop"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            height: "100%",
            width: "100%",
            pb: 3,
            pl: 3,
          }}
          component="header"
        >
          <Typography
            variant="h1"
            sx={{ color: "white" }}
            fontSize={"48px"}
            fontWeight={"medium"}
          >
            {destinationName}
          </Typography>
          {city && country ? (
            <Box
              style={{
                color: "white",
                maxWidth: "80%",
                textAlign: "start",
              }}
            >
              <LocationIndicator location={{ city, country }} fontsize="16px" />
            </Box>
          ) : null}
        </Box>
      </DestinationBackgroundImage>
      <Typography sx={{ lineHeight: 1.6, mt: 3 }}>{description}</Typography>
    </Container>
  );
}
