import DestinationCard from "components/DestinationCard/DestinationCard";
import React from "react";

function generateDestinationCardsFromDestinationData(destinations) {
  return destinations.map((destination) => {
    return <DestinationCard {...destination} key={destination.id} />;
  });
}

export default generateDestinationCardsFromDestinationData;
