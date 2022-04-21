import { useParams } from "react-router-dom";
import { useAsyncAbortable, useMountEffect, useToggle } from "@react-hookz/web";
import { makeGetRequest } from "../../util/makeApiRequest";
import endpoints from "../../util/endpoints";
import React, { useContext, useEffect, useState } from "react";
import useMessage from "../../util/hooks/useMessage";
import { CircularProgress, Container, Fab, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Edit, LocationOn } from "@mui/icons-material";
import { LoginContext } from "../../util/loginContext";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState({
    idmatkaaja: 0,
    etunimi: "",
    sukunimi: "",
    nimimerkki: "",
    paikkakunta: "",
    esittely: "",
    kuva: "",
    email: "",
  });
  const [dataFetchState, fetchUser] = useAsyncAbortable(async (signal) => {
    const users = await makeGetRequest(`${endpoints.USER}/${id}`)("", signal);
    setUser(users);
  });
  const { MessageSnackbar, showMessage } = useMessage();
  const [loginData, _] = useContext(LoginContext);
  const [drawerOpen, toggleDrawer] = useToggle();

  useEffect(() => {
    if (dataFetchState.error) {
      showMessage(
        "Virhe haettaessa käyttäjän tietoja. Yritä myöhemmin uudelleen."
      );
    }
  }, [dataFetchState.error, showMessage]);

  useMountEffect(fetchUser.execute);

  return (
    <Container maxWidth="md" sx={{ minHeight: "50vh" }}>
      {dataFetchState.status === "loading" ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <>
          <Box
            component="header"
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h1">{`${user.etunimi} ${user.sukunimi}`}</Typography>
            <Typography>{`@ ${user.nimimerkki}`}</Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <LocationOn color={"secondary"} sx={{ mr: 0, ml: -0.5 }} />
              <Typography>{`${user.paikkakunta}`}</Typography>
            </Box>
            <Typography sx={{ mt: 4 }}>{`${user.esittely}`}</Typography>
          </Box>
          {loginData.email !== "" ? (
            <>
              <Fab
                color="secondary"
                aria-label="Muokkaa tietojasi"
                sx={{ position: "fixed", right: 30, bottom: 40 }}
                onClick={() => toggleDrawer()}
              >
                <Edit />
              </Fab>
            </>
          ) : null}
        </>
      )}
      <MessageSnackbar />
    </Container>
  );
}

export default UserDetails;
