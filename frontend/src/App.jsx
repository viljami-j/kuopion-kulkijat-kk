import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import FrontPage from "./scenes/front-page/FrontPage";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FrontPage />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
