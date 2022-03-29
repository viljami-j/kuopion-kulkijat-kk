import React, { useCallback, useState } from "react";
import { Snackbar } from "@mui/material";
import useToggle from "./useToggle";

function useMessage() {
  const [open, toggleSnackbar] = useToggle();
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    toggleSnackbar();
  };

  const showMessage = useCallback(
    (messageToShow) => {
      setMessage(messageToShow);
      toggleSnackbar();
    },
    [toggleSnackbar]
  );

  const MessageSnackbar = () => (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={message}
    />
  );

  return { MessageSnackbar, showMessage };
}

export default useMessage;
