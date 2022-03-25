import { Button, SwipeableDrawer, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { DestinationDescriptionTextField } from "./DestinationDescriptionTextField";
import { Upload } from "@mui/icons-material";
import endpoints from "../../util/endpoints";
import { makePostRequest } from "../../util/makeApiRequest";
import useMessage from "../../util/hooks/useMessage";

DestinationDrawer.propTypes = {
  open: PropTypes.bool,
  toggleOpen: PropTypes.func,
  header: PropTypes.string,
  values: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    description: PropTypes.string,
  }),
};

function DestinationDrawer({ open, toggleOpen, header, values }) {
  const initialDestinationData =
    values == null
      ? {
          name: "",
          city: "",
          country: "",
          description: "",
        }
      : values;

  const [destinationData, setDestinationData] = useState(
    initialDestinationData
  );
  const { MessageSnackbar, showMessage } = useMessage();

  function onTextFieldChange(event) {
    setDestinationData({
      ...destinationData,
      [event.target.id]: event.target.value,
    });
  }

  async function postNewDestination() {
    // TODO/80: viimeistele, kun backend valmis
    try {
      await makePostRequest(endpoints.DESTINATIONS)(destinationData);
      toggleOpen();
    } catch (e) {
      showMessage("Virhe luotaessa matkakohdetta. Yritä myöhemmin uudelleen");
    }
  }

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onOpen={toggleOpen}
      onClose={toggleOpen}
      variant="temporary"
    >
      <Box
        sx={{
          px: 2,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        <Typography fontWeight="bold" component="h1" sx={{ mb: 6 }}>
          {header}
        </Typography>
        <TextField
          id="name"
          label="Nimi"
          variant="outlined"
          value={destinationData.name}
          onChange={onTextFieldChange}
        />
        <TextField
          id="city"
          label="Paikkakunta"
          variant="outlined"
          value={destinationData.city}
          onChange={onTextFieldChange}
        />
        <TextField
          id="country"
          label="Maa"
          variant="outlined"
          value={destinationData.country}
          onChange={onTextFieldChange}
        />
        <DestinationDescriptionTextField
          value={destinationData.description}
          onChange={onTextFieldChange}
        />
        <Button
          variant="contained"
          startIcon={<Upload />}
          sx={{ ml: "auto" }}
          color="secondary"
        >
          Lisää kuva
        </Button>
        <Box sx={{ display: "flex", mt: "auto", pb: 1 }}>
          <Button onClick={toggleOpen} sx={{ width: "50%" }}>
            Peruuta
          </Button>
          <Button
            onClick={postNewDestination}
            variant={"contained"}
            sx={{ width: "69%" }}
          >
            Tallenna
          </Button>
        </Box>
      </Box>
      <MessageSnackbar />
    </SwipeableDrawer>
  );
}

export default DestinationDrawer;
