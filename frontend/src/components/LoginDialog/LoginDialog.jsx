import React, { useContext, useState } from "react";
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
import { LoginContext } from "../../util/loginContext";

function LoginDialog({ open, toggle }) {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, togglePasswordVisibility] = useToggle();
  const { MessageSnackbar, showMessage } = useMessage();
  const [loginData, setLoginData] = useContext(LoginContext);

  async function handleClose() {
    try {
      const response = await makePostRequest("/login")(
        {
          email: loginState.email,
          password: loginState.password,
        },
        null,
        true
      );
      if (response.ok) {
        showMessage("Tervetuloa takaisin!");
        setLoginData({
          email: loginState.email,
          password: loginState.password,
        });
      }
    } catch (error) {
      console.log(error.message);
      showMessage("Väärä sähköposti tai salasana");
    } finally {
      toggle();
    }
  }

  function onLoginTextFieldChange(event) {
    setLoginState({
      ...loginState,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <>
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
              id={"email"}
              label={"Sähköposti"}
              variant={"outlined"}
              value={loginState.email}
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
      <MessageSnackbar />
    </>
  );
}

LoginDialog.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
};

export default LoginDialog;
