import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { ApiKeys } from "./pages/ApiKeys";
import { Credits } from "./pages/Credits";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { treaty } from "@elysia/eden";
import { ElysiaClientContextProvider } from "./provider/Eden";
import type { App } from "app";
import "./index.css";
import { ModelPage } from "./pages/Model";

const BASE_URL = process.env.VITE_API_1 ?? "http://localhost:3000";

const client = treaty<App>(BASE_URL, {
  fetch: {
    credentials: "include",
  },
});

console.log("API:", process.env.VITE_API_1);

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ElysiaClientContextProvider value={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/api-keys" element={<ApiKeys />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/models" element={<ModelPage />} />
          </Routes>
        </BrowserRouter>
      </ElysiaClientContextProvider>
    </QueryClientProvider>
  );
}

export default App;
