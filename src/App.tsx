import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { FavoriteContextProvider } from "./context/Favorite";

export function App() {
  return (
    <BrowserRouter>
      <FavoriteContextProvider>
        <Router />
      </FavoriteContextProvider>
    </BrowserRouter>
  );
}
