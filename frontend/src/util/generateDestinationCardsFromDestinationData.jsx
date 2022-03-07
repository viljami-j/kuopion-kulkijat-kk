import DestinationCard from "components/DestinationCard/DestinationCard";
import React from "react";

function generateDestinationCardsFromDestinationData(destinations) {
  return destinations.map((destination) => {
    return (
      <DestinationCard
        name={destination.kohdenimi}
        country={destination.maa}
        city={destination.paikkakunta}
        description={destination.kuvausteksti}
        image={destination.kuva}
        key={destination.idmatkakohde}
      />
    );
  });
}

export default generateDestinationCardsFromDestinationData;
