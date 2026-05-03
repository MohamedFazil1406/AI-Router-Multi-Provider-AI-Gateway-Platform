import cors from "@elysia/cors";
import { app } from "./app";

app
  .use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? "https://open-router-frontend-dashboard.vercel.app/"
          : true,
      credentials: true,
    }),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
