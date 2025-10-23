import React from "react";
import AppRouter from "./router/AppRouter";
import { WishProvider } from "./context/WishContext";

const App = () => (
  <WishProvider>
    <AppRouter />
  </WishProvider>
);

export default App;
