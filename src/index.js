import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
document.addEventListener("DOMContentLoaded", function () {
  const queryClient = new QueryClient({});
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  );
});
