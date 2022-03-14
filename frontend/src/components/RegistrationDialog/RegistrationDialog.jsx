import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";

const RegistrationDialog = ({ open, toggle }) => {
  const [registrationState, setRegistrationState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  function handleClose() {
    /*
    TODO/56: lähetä tiedot backendiin ja kirjaa käyttäjä sisään.
     */
    toggle();
  }

  function onRegistrationTextFieldChange(event) {
    setRegistrationState({
      ...registrationState,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Tervetuloa mukaan!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Täytä vielä rekisteröitymislomake ja olemme valmiita matkaan!
        </DialogContentText>

        <TextField
          id={"firstName"}
          label={"Etunimi"}
          variant={"outlined"}
          value={registrationState.firstName}
          onChange={onRegistrationTextFieldChange}
        />
        <TextField
          id={"lastName"}
          label={"Sukunimi"}
          variant={"outlined"}
          value={registrationState.lastName}
          onChange={onRegistrationTextFieldChange}
        />
        <TextField
          id={"userName"}
          label={"Nimimerkki"}
          variant={"outlined"}
          value={registrationState.userName}
          onChange={onRegistrationTextFieldChange}
        />
        <TextField
          id={"email"}
          label={"Sähköposti"}
          variant={"outlined"}
          value={registrationState.email}
          type={"email"}
          onChange={onRegistrationTextFieldChange}
        />
        <TextField
          id={"password"}
          label={"Salasana"}
          variant={"outlined"}
          value={registrationState.password}
          type={"password"}
          onChange={onRegistrationTextFieldChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Peruuta</Button>
        <Button onClick={handleClose} variant={"contained"}>
          Rekisteröidy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RegistrationDialog.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
};

export default RegistrationDialog;
