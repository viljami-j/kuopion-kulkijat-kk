import { useEffect, useState } from "react";
import { makeGetRequest } from "../makeApiRequest";
import useMessage from "./useMessage";
import endpoints from "../endpoints";
import { useToggle } from "@react-hookz/web";

/**
 * UNFINISHED CODE!
 * Awaiting ticket 86 to be done, so this can be finished
 */

const useJourneys = (id) => {
  const [journeys, setJourneys] = useState([]);
  const [isLoadingJourneys, toggleLoading] = useToggle(true);
  const { MessageSnackbar, showMessage } = useMessage();

  useEffect(
    function fetchSuggestedJourneys() {
      const abortController = new AbortController();
      const path = id ? `${endpoints.JOURNEYS}/${id}` : endpoints.JOURNEYS;

      async function fetchData() {
        try {
          const journeys = await makeGetRequest(path)(null, abortController);
          setJourneys(journeys);
        } catch (error) {
          if (error.name !== "AbortError") {
            showMessage(
              `Verkkovirhe haettaessa tarinoita. Yritä myöhemmin uudelleen.`
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
    journeys: journeys,
    isLoadingJourneys: isLoadingJourneys,
    JourneyLoadingSnackbar: MessageSnackbar,
  };
};

export default useJourneys;
