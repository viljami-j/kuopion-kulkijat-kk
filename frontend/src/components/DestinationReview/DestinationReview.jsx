import { Box, Grid, Typography, Container, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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
  description: PropTypes.string,
  isElevatedUser: PropTypes.bool,
};

export default function DestinationReview({
  imageSrc,
  destinationName,
  city,
  country,
  description,
  isElevatedUser,
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
              <LocationIndicator location={{ city, country }} fontsize="16px" />
            </div>
          ) : null}
        </Box>
      </Grid>
      <Typography sx={{ fontSize: "14px", marginTop: "30px" }}>
        {description}
      </Typography>
      <Box sx={{ flexGrow: 1, py: "30px", mt: "40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={3}>
            {isElevatedUser ? (
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  ml: "80px",
                  borderRadius: "25px",
                }}
                onClick={() => {
                  /* TO-DO/68: bring up the edit dialog */
                }}
              >
                <EditIcon sx={{ mr: "8px", fontSize: "x-large", mb: "2px" }} />
                Muokkaa
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
