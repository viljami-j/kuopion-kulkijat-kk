import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#bd4c01",
    },
    secondary: {
      main: "#a60050",
    },
    warning: {
      main: "#f5b82e",
    },
    info: {
      main: "#4392f1",
    },
    error: {
      main: "#a02c2c",
    },
    success: {
      main: "#368a2e",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
      "@media (max-width: 600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 600,
      "@media (max-width: 600px)": {
        fontSize: "1.5rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            width: "fit-content",
          }),
        }),
      },
    },
  },
});
