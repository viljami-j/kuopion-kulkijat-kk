import { useEffect, useState } from "react";
import { makeGetRequest } from "../makeApiRequest";
import useToggle from "./useToggle";
import useMessage from "./useMessage";

const useDestinations = (id) => {
  const [destinations, setDestinations] = useState([]);
  const [isLoadingDestinations, toggleLoading] = useToggle(true);
  const { MessageSnackbar, showMessage } = useMessage();

  useEffect(
    function fetchSuggestedDestinations() {
      const abortController = new AbortController();
      const path = id ? `/destinations/${id}` : `/destinations/`;

      async function fetchData() {
        try {
          const destinations = await makeGetRequest(path)(
            null,
            abortController
          );
          setDestinations(destinations);
        } catch (error) {
          if (error.name !== "AbortError") {
            showMessage(
              `Verkkovirhe haettaessa matkakohteita. Yritä myöhemmin uudelleen.`
            );
          }
        } finally {
          toggleLoading();
        }
      }

      fetchData();

      return () => abortController.abort();
    },
    [showMessage, toggleLoading, id]
  );

  return {
    destinations,
    isLoadingDestinations,
    DestinationLoadingSnackbar: MessageSnackbar,
  };
};

export default useDestinations;
