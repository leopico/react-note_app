import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { LabelContextProvider } from "./context/LabelContext";
import { MessageContextProvider } from "./context/MessageContext";
import MainRouter from "./MainRouter";

function App() {
  return (
    <LabelContextProvider>
      <MessageContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </AuthContextProvider>
      </MessageContextProvider>
    </LabelContextProvider>
  );
}

export default App;
