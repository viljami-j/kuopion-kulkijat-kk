import { Box, Grid, Typography, Container } from "@mui/material";
import LocationIndicator from "components/DestinationCard/LocationIndicator";
import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar";

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
};

export default function DestinationReview({
  imageSrc,
  destinationName,
  city,
  country,
}) {
  return (
    <Container>
      <Navbar />
      <Grid item xs={12} align="center">
        <Box
          style={{
            background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 60%), url(${imageSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            objectFit: "cover",
          }}
          sx={{
            marginTop: "2%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "611px",
            width: "100%",
            borderRadius: "15px",
          }}
        >
          <Typography
            variant="h1"
            style={{ color: "white", paddingTop: "43%" }}
            sx={{ marginRight: "70%" }}
            fontSize={"48px"}
            fontWeight={"medium"}
          >
            {destinationName}
          </Typography>

          {city && country ? (
            <div
              style={{
                color: "white",
                maxWidth: "80%",
                textAlign: "start",
                marginRight: "180px",
              }}
            >
              <LocationIndicator location={{ city, country }} />
            </div>
          ) : null}
        </Box>
      </Grid>
    </Container>
  );
}
