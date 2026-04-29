import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import { apikey } from "./modules/apikeys";
import { app as models } from "./modules/models";
import { payments } from "./modules/payments";

export const app = new Elysia().use(auth).use(apikey).use(models).use(payments);

export type App = typeof app;
