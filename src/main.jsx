import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { OverlayProvider } from "overlay-kit";

createRoot(document.getElementById("root")).render(
  <OverlayProvider>
    <App />
  </OverlayProvider>
);
