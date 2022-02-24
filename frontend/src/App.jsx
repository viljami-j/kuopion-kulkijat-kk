import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import FrontPage from "scenes/front-page/FrontPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DestinationSearch from "scenes/destination-search/DestinationSearch";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<FrontPage />}>
            <Route path="destinations" element={<DestinationSearch />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
