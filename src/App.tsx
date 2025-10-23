import React from "react";
import { HashRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { WishProvider } from "./context/WishContext";

const App = () => (
  <HashRouter>
    <WishProvider>
      <AppRouter />
    </WishProvider>
  </HashRouter>
);

export default App;