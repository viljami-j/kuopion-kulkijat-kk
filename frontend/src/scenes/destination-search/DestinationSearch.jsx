import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import DestinationCardGrid from "components/DestinationCardGrid";
import { Add } from "@mui/icons-material";
import DestinationDrawer from "../../components/DestinationDrawer/DestinationDrawer";
import { LoginContext } from "../../util/loginContext";
import { makeGetRequest } from "../../util/makeApiRequest";
import endpoints from "../../util/endpoints";
import useMessage from "../../util/hooks/useMessage";
import { useAsyncAbortable, useMountEffect, useToggle } from "@react-hookz/web";

function DestinationSearch() {
  const [destinations, setDestinations] = useState([]);
  const [state, fetchDestinations] = useAsyncAbortable(async (signal) => {
    const destinations = await makeGetRequest(endpoints.DESTINATIONS)(
      "",
      signal
    );
    setDestinations(destinations);
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, toggleDrawer] = useToggle();
  const [loginData, _] = useContext(LoginContext);
  const { MessageSnackbar, showMessage } = useMessage();

  function onTextFieldTyped(event) {
    setSearchQuery(event.target.value);
  }

  const searchResults = useMemo(() => {
    return destinations.filter((destination) => {
      return destination.kohdenimi
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [destinations, searchQuery]);

  function onDrawerClose() {
    toggleDrawer();
    fetchDestinations.execute();
  }

  useMountEffect(fetchDestinations.execute);

  useEffect(() => {
    if (state.error) {
      showMessage(
        "Verkkovirhe haettaessa matkakohteita. Yritä myöhemmin uudelleen."
      );
    }
  }, [state.error, showMessage]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} component={"main"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          mt: 8,
          width: "100%",
        }}
      >
        <Typography variant={"h1"} sx={{ mb: 7 }}>
          Matkakohdehaku
        </Typography>
        <TextField
          id={"destination-search-field"}
          label={"Etsi matkakohdetta"}
          variant={"outlined"}
          value={searchQuery}
          onChange={onTextFieldTyped}
          sx={{
            width: "100%",
          }}
        />
      </Box>

      {state.loading ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <SearchResults searchResults={searchResults} />
      )}

      <MessageSnackbar />

      {loginData.email !== "" ? (
        <Fab
          color="secondary"
          aria-label="Uusi matkakohde"
          sx={{ position: "fixed", right: 30, bottom: 40 }}
          onClick={() => toggleDrawer()}
        >
          <Add />
        </Fab>
      ) : null}

      <DestinationDrawer
        open={drawerOpen}
        toggleOpen={toggleDrawer}
        header={"Uusi matkakohde"}
        onClose={onDrawerClose}
      />
    </Box>
  );
}

function SearchResults({ searchResults }) {
  return (
    <>
      {searchResults.length !== 0 ? (
        <DestinationCardGrid destinations={searchResults} />
      ) : (
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          Haku ei tuottanut tuloksia.
        </Typography>
      )}
    </>
  );
}

export default DestinationSearch;
