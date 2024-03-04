import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { client } from "./apolloClient";
import "./globals.css";
import { appRouter } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ApolloProvider client={client}>
        <RouterProvider router={appRouter} />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
