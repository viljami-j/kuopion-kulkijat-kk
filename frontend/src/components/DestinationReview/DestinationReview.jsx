import { Container, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar";
import DestinationBackgroundImage from "../PictureWrapWithGradientCover/DestinationBackgroundImage";
import LocationIndicator from "../DestinationCard/LocationIndicator";

export function ApplyRowBreaks({ count }) {
  return [...Array(count)].map((e, i) => (
    <Grid
      item
      xs={12}
      sx={{
        userSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      ⠀
    </Grid>
  ));
}

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
      <Grid container spacing={2} rowSpacing={4} sx={{ mt: "-10px" }}>
        <Grid item xs={12}>
          <DestinationBackgroundImage
            imageSrc={imageSrc}
            gradientType={"bottomToTop"}
          >
            <Grid container>
              <ApplyRowBreaks count={18} />
              <Grid item xs={0.3} />
              <Grid item xs={8}>
                <Typography
                  variant="h1"
                  sx={{ color: "white" }}
                  fontSize={"48px"}
                  fontWeight={"medium"}
                >
                  {destinationName}
                </Typography>
              </Grid>
              <Grid item xs={3.7} />
              <Grid item xs={0.3} />
              <Grid item xs={8}>
                {city && country ? (
                  <div
                    style={{
                      color: "white",
                      maxWidth: "80%",
                      textAlign: "start",
                    }}
                  >
                    <LocationIndicator
                      location={{ city, country }}
                      fontsize="16px"
                    />
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </DestinationBackgroundImage>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "14px" }}>{description}</Typography>
        </Grid>
        <ApplyRowBreaks count={1} />
      </Grid>
    </Container>
  );
}
