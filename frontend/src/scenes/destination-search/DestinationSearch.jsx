import React, { useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import DestinationCardGrid from "components/DestinationCardGrid";
import useDestinations from "../../util/hooks/useDestinations";
import { Add } from "@mui/icons-material";
import DestinationDrawer from "../../components/DestinationDrawer/DestinationDrawer";
import useToggle from "../../util/hooks/useToggle";

function DestinationSearch() {
  const { destinations, isLoadingDestinations, DestinationLoadingSnackbar } =
    useDestinations();
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, toggleDrawer] = useToggle();

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

      {isLoadingDestinations ? (
        <CircularProgress sx={{ mx: "auto", my: 20 }} />
      ) : (
        <SearchResults searchResults={searchResults} />
      )}

      <DestinationLoadingSnackbar />
      <Fab
        color="secondary"
        aria-label="Uusi matkahde"
        sx={{ position: "fixed", right: 60, bottom: 60 }}
        onClick={toggleDrawer}
      >
        <Add />
      </Fab>

      <DestinationDrawer
        open={drawerOpen}
        toggleOpen={toggleDrawer}
        header={"Uusi matkakohde"}
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
