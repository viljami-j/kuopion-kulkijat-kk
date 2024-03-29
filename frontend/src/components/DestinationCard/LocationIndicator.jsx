import React from "react";
import PropTypes from "prop-types";
import { LocationOn } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

LocationIndicator.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  fontSize: PropTypes.string,
};

LocationIndicator.defaultProps = {
  fontsize: "14px",
};

function LocationIndicator({ location, fontsize }) {
  const { city, country } = location;
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", mt: 1, alignItems: "center" }}
    >
      <LocationOn color={"secondary"} sx={{ mr: 1, ml: -0.5 }} />
      <Typography fontSize={fontsize}>{`${city}, ${country}`}</Typography>
    </Box>
  );
}

export default LocationIndicator;
