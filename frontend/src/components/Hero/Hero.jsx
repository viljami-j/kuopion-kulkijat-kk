import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function Hero({ imageSrc, header, caption }) {
  return (
    <section aria-labelledby={"hero-title"}>
      <Grid item xs={12} align="center">
        <Box
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 60%), url(${imageSrc})`,
            backgroundSize: "cover",
            objectFit: "cover",
          }}
          sx={{
            marginTop: "2%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "611px",
            width: "92%",
            borderRadius: "15px",
          }}
        >
          <Typography
            id="hero-title"
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
        </Box>
      </Grid>
    </section>
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
