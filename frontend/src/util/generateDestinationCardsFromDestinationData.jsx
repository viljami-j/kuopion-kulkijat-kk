import DestinationCard from "components/DestinationCard/DestinationCard";
import React from "react";

function generateDestinationCardsFromDestinationData(destinations) {
  function sortByDestinationName(destination1, destination2) {
    if (destination1.name < destination2.name) return -1;
    if (destination1.name > destination2.name) return 1;
    return 0;
  }

  return destinations
    .sort(sortByDestinationName)
    .map((destination) => (
      <DestinationCard
        name={destination.kohdenimi}
        country={destination.maa}
        city={destination.paikkakunta}
        description={destination.kuvausteksti}
        image={destination.kuva}
        key={destination.idmatkakohde}
      />
    ));
}

export default generateDestinationCardsFromDestinationData;
