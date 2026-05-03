import { treaty } from "@elysia/eden";
import { type App } from "app";
import { createContext, useContext } from "react";

const BASE_URL = process.env.VITE_API_1! ?? "http://localhost:3000";

const client = treaty<App>(BASE_URL, {
  fetch: {
    credentials: "include",
  },
});

console.log("API:", process.env.VITE_API_1);

const ElysiaClientContext = createContext(client);

export const ElysiaClientContextProvider = ElysiaClientContext.Provider;

export const useElysiaClient = () => {
  const client = useContext(ElysiaClientContext);
  return client;
};
