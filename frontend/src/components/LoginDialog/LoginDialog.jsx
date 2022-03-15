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

function LoginDialog({ open, toggle }) {
  const [loginState, setLoginState] = useState({
    userName: "",
    password: "",
  });
  const [passwordVisible, togglePasswordVisibility] = useToggle();

  function handleClose() {
    /*
    TODO/56: lähetä tiedot backendiin ja kirjaa käyttäjä sisään.
     */
    toggle();
  }

  function onLoginTextFieldChange(event) {
    setLoginState({
      ...loginState,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ fontSize: "1rem", fontWeight: "bold" }}>
        Tervetuloa takaisin!
      </DialogTitle>
      <DialogContent sx={{ maxWidth: "352px" }}>
        <DialogContentText sx={{ fontSize: "1rem", color: "black", mb: 3 }}>
          Kirjaudu sisään ja olemme valmiita lähtemään matkaan!
        </DialogContentText>

        <Box sx={{ mt: 1 }}>
          <TextField
            id={"userName"}
            label={"Nimimerkki"}
            variant={"outlined"}
            value={loginState.userName}
            onChange={onLoginTextFieldChange}
            sx={{ mb: 1 }}
          />
          <TextField
            id={"password"}
            label={"Salasana"}
            variant={"outlined"}
            value={loginState.password}
            type={passwordVisible ? "text" : "password"}
            onChange={onLoginTextFieldChange}
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
          sx={{ width: "69%" }}
        >
          Kirjaudu sisään
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
};

export default LoginDialog;
