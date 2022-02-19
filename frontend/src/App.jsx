import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import FrontPage from "./scenes/front-page/FrontPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FrontPage />
    </ThemeProvider>
  );
}

export default App;
