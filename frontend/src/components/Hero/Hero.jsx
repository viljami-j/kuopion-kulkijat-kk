import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PictureWrapWithGradientCover from "components/PictureWrapWithGradientCover/PictureWrapWithGradientCover";

export default function Hero({ imageSrc, header, caption }) {
  return (
    <Grid item xs={12} align="center">
      <PictureWrapWithGradientCover
        imageSrc={imageSrc}
        gradientType={"horizontal"}
        wrappedElement={
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
        }
      />
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
