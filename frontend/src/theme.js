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
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: ({ ownerState }) => ({
          ...(ownerState.variant === "h1" && {
            fontSize: "48px",
            fontWeight: 500,
          }),
        }),
        h2: ({ ownerState }) => ({
          ...(ownerState.variant === "h2" && {
            fontSize: "36px",
            fontWeight: 600,
          }),
        }),
      },
    },
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
