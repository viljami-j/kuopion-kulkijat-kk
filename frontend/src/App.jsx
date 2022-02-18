import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import Navbar from "components/Navbar/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes></Routes>
        <Navbar />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
