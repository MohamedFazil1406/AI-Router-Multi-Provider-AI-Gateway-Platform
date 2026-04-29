import Elysia from "elysia";
import { PaymentsService } from "./service";
import jwt from "@elysiajs/jwt";
import { PaymentsModel } from "./model";

export const payments = new Elysia({ prefix: "/payments" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET_KEY!,
    }),
  )
  .resolve(async ({ cookie: { auth }, jwt, status }) => {
    if (!auth) {
      return status(401, { msg: "Unauthorized" });
    }
    const decoded = await jwt.verify(auth.value as string);
    if (!decoded || !decoded.userId) {
      return status(401, { msg: "Unauthorized" });
    }
    return { userId: decoded.userId };
  })
  .post(
    "/onramp",
    async ({ userId, status }) => {
      try {
        const credits = await PaymentsService.onramp(Number(userId));
        return credits;
      } catch (e) {
        console.log(e);
        return status(411, { msg: "Error processing onramp" });
      }
    },
    {
      response: {
        200: PaymentsModel.onrampResponseSchema,
        411: PaymentsModel.onrampFailureResponseSchema,
      },
    },
  );
