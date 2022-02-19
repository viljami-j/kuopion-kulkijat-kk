import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Hero
          imageSrc="https://cdn.wallpapersafari.com/94/43/bf8BcM.jpg"
          header="Tervetuloa kulkemaan kanssamme!"
          caption="Tutustu maailmaan yhdessä tuhansien käyttäjiemme kanssa. Älä kulje
          enää yksin. Ota Kuopion Kulkijat mukaasi."
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
