import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function Hero({ imageSrc, header, caption }) {
  return (
    <Grid item xs={12} align="center">
      <Box
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.6954131994594712) 100%), url(" +
            imageSrc +
            ")",
          backgroundSize: "cover",
        }}
        sx={{
          marginTop: "2%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "80vh",
          width: "92%",
          borderRadius: "15px",
        }}
      >
        <Typography
          variant="h2"
          style={{ color: "white", position: "relative", top: "8%" }}
        >
          {header}
        </Typography>
        <Typography
          style={{
            color: "white",
            position: "relative",
            top: "11%",
            width: "34%",
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
