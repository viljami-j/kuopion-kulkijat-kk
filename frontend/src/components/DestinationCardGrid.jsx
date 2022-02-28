import { Box } from "@mui/material";
import generateDestinationCardsFromDestinationData from "../util/generateDestinationCardsFromDestinationData";
import React from "react";
import * as PropTypes from "prop-types";
import { DestinationPropType } from "./DestinationCard/DestinationCard";

function DestinationCardGrid({ destinations }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(251px, 1fr))",
        gridColumnGap: (theme) => theme.spacing(4),
        gridRowGap: (theme) => theme.spacing(5),
        justifyItems: "center",
        mt: 10,
        mb: 6,
      }}
    >
      {generateDestinationCardsFromDestinationData(destinations)}
    </Box>
  );
}

DestinationCardGrid.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.shape(DestinationPropType)),
};

export default DestinationCardGrid;
