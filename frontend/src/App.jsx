import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import Index from "./scenes/front-page/FrontPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Index />
    </ThemeProvider>
  );
}

export default App;
