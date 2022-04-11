import React, { useContext } from "react";
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
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { makePostRequest } from "../../util/makeApiRequest";
import { LoginContext } from "../../util/loginContext";
import endpoints from "../../util/endpoints";
import { useToggle } from "@react-hookz/web";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

function LoginDialog({ open, toggle, showMessage }) {
  const [passwordVisible, togglePasswordVisibility] = useToggle();
  const [_, setLoginData] = useContext(LoginContext);

  async function onSubmit(values) {
    try {
      const response = await makePostRequest(endpoints.LOGIN)(
        {
          email: values.email,
          password: values.password,
        },
        null,
        true
      );
      if (response.ok) {
        setLoginData({
          email: values.email,
          password: values.password,
        });
      } else {
        showMessage("Väärä sähköposti tai salasana.");
        toggle();
      }
    } catch (error) {
      showMessage("Odottamaton virhe kirjautumisessa.");
      toggle();
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Epäkelpo sähköpostiosoite")
      .required("Pakollinen"),
    password: Yup.string()
      .max(45, "Salasanan on oltava alle 45 merkkiä pitkä.")
      .required("Pakollinen"),
  });

  return (
    <>
      <Dialog open={open}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <DialogTitle sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Tervetuloa takaisin!
            </DialogTitle>
            <DialogContent sx={{ maxWidth: "352px" }}>
              <DialogContentText
                sx={{ fontSize: "1rem", color: "black", mb: 3 }}
              >
                Kirjaudu sisään ja olemme valmiita lähtemään matkaan!
              </DialogContentText>

              <Box sx={{ mt: 1 }}>
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      label={"Sähköposti"}
                      variant={"outlined"}
                      {...field}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      type="email"
                      sx={{ mb: 1 }}
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field, meta }) => (
                    <TextField
                      name={"password"}
                      label={"Salasana"}
                      variant={"outlined"}
                      type={passwordVisible ? "text" : "password"}
                      {...field}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => togglePasswordVisibility()}
                              onMouseDown={(event) => event.preventDefault()}
                              edge="end"
                            >
                              {passwordVisible ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Box>
            </DialogContent>
            <DialogActions sx={{ mx: 2, mb: 2 }}>
              <Button onClick={toggle} sx={{ width: "50%" }}>
                Peruuta
              </Button>
              <Button type="submit" variant={"contained"} sx={{ width: "69%" }}>
                Kirjaudu sisään
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
}

LoginDialog.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  showMessage: PropTypes.func,
};

export default LoginDialog;
