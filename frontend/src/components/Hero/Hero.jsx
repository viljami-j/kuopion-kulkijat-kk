import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DestinationBackgroundImage from "components/PictureWrapWithGradientCover/DestinationBackgroundImage";

export default function Hero({ imageSrc, header, caption }) {
  return (
    <Grid item xs={12} align="center">
      <DestinationBackgroundImage
        imageSrc={imageSrc}
        gradientType={"topToBottom"}
      >
        <div style={{ marginTop: "2%" }}>
          <Typography
            variant="h1"
            style={{ color: "white" }}
            sx={{ pt: 4, pb: 2 }}
            fontSize={"48px"}
            fontWeight={"medium"}
          >
            {header}
          </Typography>
          <Typography
            style={{
              color: "white",
              maxWidth: "80%",
              textAlign: "start",
            }}
          >
            {caption}
          </Typography>
        </div>
      </DestinationBackgroundImage>
    </Grid>
  );
}

Hero.defaultProps = {
  imageSrc: "",
  header: "",
  caption: "",
};

Hero.propTypes = {
  imageSrc: PropTypes.string,
  header: PropTypes.string,
  caption: PropTypes.string,
};
