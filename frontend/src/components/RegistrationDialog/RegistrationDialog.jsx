import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import useToggle from "../../util/hooks/useToggle";
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { makePostRequest } from "../../util/makeApiRequest";
import useMessage from "../../util/hooks/useMessage";

function RegistrationDialog({ open, toggle }) {
  const [registrationState, setRegistrationState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [passwordVisible, togglePasswordVisibility] = useToggle();
  const { MessageSnackbar, showMessage } = useMessage();

  async function handleClose() {
    try {
      await makePostRequest("/register")({
        email: registrationState.email,
        password: registrationState.password,
      });
      showMessage("Rekisteröityminen onnistui. Voit nyt kirjautua sisään.");
    } catch (error) {
      showMessage("Ongelma rekisteröitymisessä. Yritä myöhemmin uudelleen.");
    }
    toggle();
  }

  function onRegistrationTextFieldChange(event) {
    setRegistrationState({
      ...registrationState,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          Tervetuloa mukaan!
        </DialogTitle>
        <DialogContent sx={{ maxWidth: "352px" }}>
          <DialogContentText sx={{ fontSize: "1rem", color: "black", mb: 3 }}>
            Täytä vielä rekisteröitymislomake ja olemme valmiita matkaan!
          </DialogContentText>

          <Box sx={{ mt: 1 }}>
            <TextField
              id={"firstName"}
              label={"Etunimi"}
              variant={"outlined"}
              value={registrationState.firstName}
              onChange={onRegistrationTextFieldChange}
              sx={{ mb: 1 }}
            />
            <TextField
              id={"lastName"}
              label={"Sukunimi"}
              variant={"outlined"}
              value={registrationState.lastName}
              onChange={onRegistrationTextFieldChange}
              sx={{ mb: 1 }}
            />
            <TextField
              id={"userName"}
              label={"Nimimerkki"}
              variant={"outlined"}
              value={registrationState.userName}
              onChange={onRegistrationTextFieldChange}
              sx={{ mb: 1 }}
            />
            <TextField
              id={"email"}
              label={"Sähköposti"}
              variant={"outlined"}
              value={registrationState.email}
              type={"email"}
              onChange={onRegistrationTextFieldChange}
              sx={{ mb: 1 }}
            />
            <TextField
              id={"password"}
              label={"Salasana"}
              variant={"outlined"}
              value={registrationState.password}
              type={passwordVisible ? "text" : "password"}
              onChange={onRegistrationTextFieldChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 2, mb: 2 }}>
          <Button onClick={toggle} sx={{ width: "50%" }}>
            Peruuta
          </Button>
          <Button
            onClick={handleClose}
            variant={"contained"}
            sx={{ width: "50%" }}
          >
            Rekisteröidy
          </Button>
        </DialogActions>
      </Dialog>
      <MessageSnackbar />
    </>
  );
}

RegistrationDialog.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
};

export default RegistrationDialog;
