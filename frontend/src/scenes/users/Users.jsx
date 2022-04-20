import {
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAsyncAbortable, useMountEffect } from "@react-hookz/web";
import { makeGetRequest } from "../../util/makeApiRequest";
import endpoints from "../../util/endpoints";
import React, { useEffect, useState } from "react";
import useMessage from "../../util/hooks/useMessage";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [dataFetchState, fetchUsers] = useAsyncAbortable(async (signal) => {
    const users = await makeGetRequest(endpoints.USERS)("", signal);
    setUsers(users);
  });
  const { MessageSnackbar, showMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataFetchState.error) {
      showMessage("Virhe haettaessa jäseniä. Yritä myöhemmin uudelleen.");
    }
  }, [dataFetchState.error, showMessage]);

  useMountEffect(fetchUsers.execute);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        mt: 4,
      }}
    >
      <Typography variant="h1">Jäsenet</Typography>
      {dataFetchState.status === "loading" ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <List sx={{ alignSelf: "start", width: "100%" }}>
          {users
            .filter((user) => user.etunimi && user.sukunimi)
            .map((user) => (
              <ListItem key={user.idmatkaaja}>
                <ListItemButton
                  onClick={() => navigate(`/users/${user.idmatkaaja}`)}
                >
                  <ListItemIcon>
                    <AccountCircle fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${user.etunimi} ${user.sukunimi}`}
                    secondary={`@ ${user.nimimerkki}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
      <MessageSnackbar />
    </Container>
  );
}

export default Users;
