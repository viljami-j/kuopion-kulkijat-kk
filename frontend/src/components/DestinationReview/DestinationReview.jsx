import { CircularProgress, Fab, Typography } from "@mui/material";
import DestinationBackgroundImage from "../DestinationBackgroundImage/DestinationBackgroundImage";
import LocationIndicator from "../DestinationCard/LocationIndicator";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import useDestinations from "../../util/hooks/useDestinations";
import React from "react";
import { Edit } from "@mui/icons-material";
import DestinationDrawer from "../DestinationDrawer/DestinationDrawer";
import useToggle from "../../util/hooks/useToggle";

export default function DestinationReview() {
  const { id } = useParams();
  const { destinations, isLoadingDestinations, DestinationLoadingSnackbar } =
    useDestinations(id);
  const [drawerOpen, toggleDrawer] = useToggle();

  const { kohdenimi, maa, paikkakunta, kuvausteksti, kuva } = destinations;

  return (
    <Box>
      {isLoadingDestinations ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
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
          <Typography sx={{ lineHeight: 1.6, mt: 3 }}>
            {kuvausteksti}
          </Typography>
        </>
      )}
      <DestinationLoadingSnackbar />

      <Fab
        color="secondary"
        aria-label="Muokkaa matkakohdetta"
        sx={{ position: "fixed", right: 60, bottom: 60 }}
        onClick={toggleDrawer}
      >
        <Edit />
      </Fab>

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
      />
    </Box>
  );
}
