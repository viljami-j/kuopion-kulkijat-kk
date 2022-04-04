import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import endpoints from "../../util/endpoints";
import { makePostRequest } from "../../util/makeApiRequest";
import useMessage from "../../util/hooks/useMessage";
import { formatISO } from "date-fns";

JourneyDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  values: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    private: PropTypes.bool,
  }),
};

function JourneyDrawer({ open, toggleOpen, header, values }) {
  const initialJourneyData =
    values == null
      ? {
          startDate: "",
          endDate: "",
          private: false,
        }
      : values;

  const [journeyData, setJourneyData] = useState(initialJourneyData);
  const { MessageSnackbar, showMessage } = useMessage();

  function onDateFieldChange(event) {
    setJourneyData({
      ...journeyData,
      [event.target.id]: event.target.value,
    });
  }

  function onCheckboxChecked(event) {
    setJourneyData({
      ...journeyData,
      [event.target.id]: event.target.checked,
    });
  }

  async function postNewJourney() {
    // TODO/87: viimeistele, kun backend valmis
    try {
      await makePostRequest(endpoints.JOURNEYS)(journeyData);
      toggleOpen();
    } catch (e) {
      showMessage("Virhe luotaessa matkakertomusta. Yritä myöhemmin uudelleen");
    }
  }

  useEffect(() => {
    if (values != null) {
      setJourneyData(values);
    }
  }, [values]);

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
          id="startDate"
          label="Alkupäivämäärä"
          type="date"
          defaultValue={formatISO(new Date(), { representation: "date" })}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onDateFieldChange}
        />
        <TextField
          id="endDate"
          label="Loppupäivämäärä"
          type="date"
          defaultValue={formatISO(new Date(), { representation: "date" })}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onDateFieldChange}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={journeyData.private} id="private" />}
            label="Yksityinen"
            onChange={onCheckboxChecked}
          />
        </FormGroup>
        <Box sx={{ display: "flex", mt: "auto", pb: 1 }}>
          <Button onClick={toggleOpen} sx={{ width: "50%" }}>
            Peruuta
          </Button>
          <Button
            onClick={postNewJourney}
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

export default JourneyDrawer;
