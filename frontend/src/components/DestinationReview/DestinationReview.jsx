import { CircularProgress, Fab, Typography } from "@mui/material";
import DestinationBackgroundImage from "../DestinationBackgroundImage/DestinationBackgroundImage";
import LocationIndicator from "../DestinationCard/LocationIndicator";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import DestinationDrawer from "../DestinationDrawer/DestinationDrawer";
import { theme } from "../../theme";
import { makeDeleteRequest, makeGetRequest } from "../../util/makeApiRequest";
import endpoints from "../../util/endpoints";
import useMessage from "../../util/hooks/useMessage";
import { LoginContext } from "../../util/loginContext";
import { useAsyncAbortable, useMountEffect, useToggle } from "@react-hookz/web";

export default function DestinationReview() {
  const { id } = useParams();
  const [destinations, setDestinations] = useState([]);
  const [dataFetchState, fetchDestination] = useAsyncAbortable(
    async (signal) => {
      const destinations = await makeGetRequest(
        `${endpoints.DESTINATIONS}/${id}`
      )("", signal);
      setDestinations(destinations);
    }
  );
  const [drawerOpen, toggleDrawer] = useToggle();
  const { MessageSnackbar, showMessage } = useMessage();

  const { kohdenimi, maa, paikkakunta, kuvausteksti, kuva } = destinations;
  const [loginData, _] = useContext(LoginContext);

  function deleteDestination() {
    try {
      // TODO/80: viimeistele, kun backend valmis
      makeDeleteRequest(endpoints.DESTINATIONS)();
    } catch (e) {
      showMessage(
        "Virhe poistettaessa matkakohdetta. Yritä myöhemmin uudelleen."
      );
    }
  }

  useEffect(() => {
    if (dataFetchState.error) {
      showMessage(
        "Verkkovirhe haettaessa matkakohdetta. Yritä myöhemmin uudelleen."
      );
    }
  }, [dataFetchState.error, showMessage]);

  useMountEffect(fetchDestination.execute);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {dataFetchState.loading ? (
        <CircularProgress sx={{ m: 20 }} />
      ) : (
        <>
          <DestinationBackgroundImage imageSrc={kuva} direction={"bottomToTop"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                height: "100%",
                width: "100%",
                pb: 3,
                pl: 3,
              }}
              component="header"
            >
              <Typography
                variant="h1"
                sx={{ color: "white" }}
                fontSize={"48px"}
                fontWeight={"medium"}
              >
                {kohdenimi}
              </Typography>
              {paikkakunta && maa ? (
                <Box
                  style={{
                    color: "white",
                    maxWidth: "80%",
                    textAlign: "start",
                  }}
                >
                  <LocationIndicator
                    location={{ city: paikkakunta, country: maa }}
                    fontsize="16px"
                  />
                </Box>
              ) : null}
            </Box>
          </DestinationBackgroundImage>
          <Typography sx={{ lineHeight: 1.6, mt: 3, alignSelf: "flex-start" }}>
            {kuvausteksti}
          </Typography>
        </>
      )}

      {loginData.email !== "" ? (
        <>
          <Fab
            aria-label="Poista matkakohde"
            sx={{
              position: "fixed",
              right: 30,
              bottom: 108,
              backgroundColor: theme.palette.error.main,
              color: "white",
            }}
            onClick={deleteDestination}
          >
            <Delete />
          </Fab>
          <Fab
            color="secondary"
            aria-label="Muokkaa matkakohdetta"
            sx={{ position: "fixed", right: 30, bottom: 40 }}
            onClick={() => toggleDrawer()}
          >
            <Edit />
          </Fab>
        </>
      ) : null}

      <DestinationDrawer
        open={drawerOpen}
        toggleOpen={toggleDrawer}
        header={"Muokkaa matkakohdetta"}
        values={{
          name: kohdenimi,
          city: paikkakunta,
          country: maa,
          description: kuvausteksti,
        }}
        onClose={() => toggleDrawer()}
      />
      <MessageSnackbar />
    </Box>
  );
}
