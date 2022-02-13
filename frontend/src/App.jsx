import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import DestinationCard from "components/DestinationCard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DestinationCard />
    </ThemeProvider>
  );
}

export default App;
