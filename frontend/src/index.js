import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CurrentUserListingProvider from "./components/context/CurrentUserListingContext";
import BookingContextProvider from "./components/context/BookingContext";
import ChatContextProvider from "./components/context/ChatContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CurrentUserContextProvider from "./components/context/CurrentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CurrentUserContextProvider>
          <ChatContextProvider>
            <CurrentUserListingProvider>
              <BookingContextProvider>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </BookingContextProvider>
            </CurrentUserListingProvider>
          </ChatContextProvider>
        </CurrentUserContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
