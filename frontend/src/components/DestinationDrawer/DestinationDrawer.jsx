import { Button, SwipeableDrawer, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { DestinationDescriptionTextField } from "./DestinationDescriptionTextField";
import { Upload } from "@mui/icons-material";
import endpoints from "../../util/endpoints";
import { makePostRequest, makePutRequest } from "../../util/makeApiRequest";
import useMessage from "../../util/hooks/useMessage";
import { useAsync } from "@react-hookz/web";

DestinationDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  values: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    description: PropTypes.string,
  }),
};

function DestinationDrawer({ open, onClose, header, values }) {
  const initialDestinationData =
    values == null
      ? {
          id: 0,
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
  const [destinationOperationState, destinationOperation] = useAsync(() =>
    values == null ? postDestinationData() : putDestinationData()
  );

  async function postDestinationData() {
    return await makePostRequest(endpoints.DESTINATIONS)({
      kohdenimi: destinationData.name,
      maa: destinationData.country,
      paikkakunta: destinationData.city,
      kuvausteksti: destinationData.description,
    });
  }

  async function putDestinationData() {
    return await makePutRequest(
      `${endpoints.DESTINATIONS}/${destinationData.id}`
    )({
      idmatkakohde: destinationData.id,
      kohdenimi: destinationData.name,
      maa: destinationData.country,
      paikkakunta: destinationData.city,
      kuvausteksti: destinationData.description,
    });
  }

  function onTextFieldChange(event) {
    setDestinationData({
      ...destinationData,
      [event.target.id]: event.target.value,
    });
  }

  useEffect(() => {
    if (destinationOperationState.status === "success") {
      onClose();
    }
  }, [destinationOperationState.status, onClose]);

  useEffect(() => {
    if (destinationOperationState.error) {
      showMessage("Virhe luotaessa matkakohdetta. Yritä myöhemmin uudelleen");
    }
  }, [destinationOperationState.error, showMessage]);

  useEffect(() => {
    if (values != null) {
      setDestinationData(values);
    }
  }, [values]);

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onOpen={() => null}
      onClose={onClose}
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
          <Button onClick={onClose} sx={{ width: "50%" }}>
            Peruuta
          </Button>
          <Button
            onClick={destinationOperation.execute}
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
