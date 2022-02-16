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
  props: {
    MuiAppBar: {
      color: "transparent",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h2: ({ ownerState }) => ({
          ...(ownerState.variant === "h2" && {
            fontSize: "36px",
            fontWeight: 600,
          }),
        }),
      },
    },
  },
});
