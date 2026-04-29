import cors from "@elysia/cors";
import { app } from "./app";

app.use(cors()).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
