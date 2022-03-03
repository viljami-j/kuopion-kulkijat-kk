import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "theme";
import FrontPage from "./scenes/front-page/FrontPage";
import DestinationReview from "components/DestinationReview/DestinationReview";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  const [reviewingDestinationId, setReviewingDestinationId] = useState("1");

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {reviewingDestinationId ? (
          <DestinationReview
            destinationName="Ounasvaara"
            imageSrc="https://www.visitrovaniemi.fi/wp-content/uploads/Ounasvaara-Ski-Centre-2-900x505.jpg"
            city="Rovaniemi"
            country="Finland"
          />
        ) : (
          <FrontPage />
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
