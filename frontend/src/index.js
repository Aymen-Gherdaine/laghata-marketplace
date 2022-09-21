import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CurrentUserListingProvider from "./components/context/CurrentUserListingContext";
import BookingContextProvider from "./components/context/BookingContext";
import ChatContextProvider from "./components/context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatContextProvider>
        <CurrentUserListingProvider>
          <BookingContextProvider>
            <App />
          </BookingContextProvider>
        </CurrentUserListingProvider>
      </ChatContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
