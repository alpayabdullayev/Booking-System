import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import GlobalProvider from "./context/GlobalContext.jsx";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <GlobalProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </GlobalProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
