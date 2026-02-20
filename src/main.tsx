import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { init } from "@noriginmedia/norigin-spatial-navigation";
import App from "./App.tsx";
import { store } from "./store";
import "./index.css";

init({
  debug: false,
  visualDebug: false,
  throttle: 50,
  distanceCalculationMethod: "center",
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
