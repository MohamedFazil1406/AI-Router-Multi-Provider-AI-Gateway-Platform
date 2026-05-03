import cors from "@elysia/cors";
import { app } from "./app";

app
  .use(
    cors({
      origin: ["https://open-router-frontend-dashboard.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
