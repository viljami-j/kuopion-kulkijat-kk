import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function Hero({ imageSrc, header, caption }) {
  return (
    <Grid item xs={12} align="center">
      <Box
        sx={{
          marginTop: "25px",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "800px",
          width: "92%",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h2"
          style={{ color: "white", position: "relative", top: "50px" }}
        >
          {header}
        </Typography>
        <Typography
          style={{
            color: "white",
            position: "relative",
            top: "80px",
            width: "600px",
          }}
        >
          {caption}
        </Typography>
      </Box>
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
