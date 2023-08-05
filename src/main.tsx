import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { FavoriteContextProvider } from "./context/Favorite.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoriteContextProvider>
      <App />
    </FavoriteContextProvider>
  </React.StrictMode>
);
