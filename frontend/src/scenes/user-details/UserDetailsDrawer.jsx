import {
  Button,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import endpoints from "../../util/endpoints";
import { makePutRequest } from "../../util/makeApiRequest";
import useMessage from "../../util/hooks/useMessage";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useToggle } from "@react-hookz/web";

UserDetailsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  values: PropTypes.shape({
    idmatkaaja: PropTypes.string,
    etunimi: PropTypes.string,
    sukunimi: PropTypes.string,
    nimimerkki: PropTypes.string,
    paikkakunta: PropTypes.string,
    esittely: PropTypes.string,
    email: PropTypes.string,
    salasana: PropTypes.string,
  }).isRequired,
};

function UserDetailsDrawer({ open, header, values, onClose, toggle }) {
  const { MessageSnackbar, showMessage } = useMessage();
  const [passwordVisible, togglePasswordVisibility] = useToggle();

  async function onSubmit(values) {
    try {
      const response = await makePutRequest(
        `${endpoints.USER}/${values.idmatkaaja}`
      )(values, null, true);
      if (response.ok) {
        showMessage("Tietojen päivittäminen onnistui.");
        setTimeout(onClose, 1000);
      } else {
        showMessage(
          "Ongelma käyttäjätietojen päivittämisessä. Yritä myöhemmin uudelleen."
        );
        setTimeout(() => toggle(), 1000);
      }
    } catch (error) {
      showMessage("Odottamaton virhe käyttäjätietojen päivittämisessä");
      setTimeout(() => toggle(), 1000);
    }
  }

  const validationSchema = Yup.object({
    etunimi: Yup.string()
      .max(45, "Etunimen on oltava alle 45 merkkiä pitkä")
      .required("Pakollinen"),
    sukunimi: Yup.string()
      .max(45, "Sukunimen on oltava alle 45 merkkiä pitkä")
      .required("Pakollinen"),
    nimimerkki: Yup.string()
      .max(45, "Nimimerkin on oltava alle 45 merkkiä pitkä")
      .required("Pakollinen"),
    paikkakunta: Yup.string()
      .max(45, "Paikkakunnan nimen on oltava alle 45 merkkiä pitkä")
      .required("Pakollinen"),
    esittely: Yup.string()
      .max(500, "Esittelyn on oltava alle 500 merkkiä pitkä")
      .required("Pakollinen"),
    email: Yup.string()
      .email("Epäkelpo sähköpostiosoite")
      .required("Pakollinen"),
    password: Yup.string()
      .max(45, "Salasanan on oltava alle 45 merkkiä pitkä.")
      .required("Pakollinen"),
  });

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onOpen={() => null}
      onClose={onClose}
      variant="temporary"
    >
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
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
            <Field name="etunimi">
              {({ field, meta }) => (
                <TextField
                  label="Etunimi"
                  variant="outlined"
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Field name="sukunimi">
              {({ field, meta }) => (
                <TextField
                  label="Sukunimi"
                  variant="outlined"
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Field name="nimimerkki">
              {({ field, meta }) => (
                <TextField
                  label="Nimimerkki"
                  variant="outlined"
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Field name="paikkakunta">
              {({ field, meta }) => (
                <TextField
                  label="Paikkakunta"
                  variant="outlined"
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Field name="esittely">
              {({ field, meta }) => (
                <TextField
                  label="Esittely"
                  variant="outlined"
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Field name="email">
              {({ field, meta }) => (
                <TextField
                  label="Sähköposti"
                  variant="outlined"
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                  type="email"
                />
              )}
            </Field>
            <Field name="password">
              {({ field, meta }) => (
                <TextField
                  label="Salasana"
                  variant="outlined"
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                  type={passwordVisible ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => togglePasswordVisibility()}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Field>

            <Box sx={{ display: "flex", mt: "auto", pb: 1 }}>
              <Button onClick={() => toggle()} sx={{ width: "50%" }}>
                Peruuta
              </Button>
              <Button type="submit" variant={"contained"} sx={{ width: "69%" }}>
                Tallenna
              </Button>
            </Box>
          </Box>
        </Form>
      </Formik>
      <MessageSnackbar />
    </SwipeableDrawer>
  );
}

export default UserDetailsDrawer;
