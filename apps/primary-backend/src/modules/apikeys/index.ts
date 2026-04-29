import { ApiKeysModel } from "./module";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { ApiKeysService } from "./service";

export const apikey = new Elysia({ prefix: "/api-keys" })
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
    "/",
    async ({ userId, body }) => {
      const { apiKey, id } = await ApiKeysService.createApiKey(
        body.name,
        Number(userId),
      );
      return {
        id,
        key: apiKey,
      };
    },
    {
      body: ApiKeysModel.createApiKeySchema,
      response: {
        200: ApiKeysModel.createApiKeyResponseSchema,
      },
    },
  )

  .get(
    "/",
    async ({ userId }) => {
      const apiKeys = await ApiKeysService.getApiKeys(Number(userId));
      return {
        apiKeys,
      };
    },
    {
      response: {
        200: ApiKeysModel.getApiKeyResponseSchema,
      },
    },
  )

  .put(
    "/",
    async ({ userId, body, status }) => {
      try {
        await ApiKeysService.updateApiKey(
          Number(userId),
          Number(body.id),
          body.disabled,
        );
        return status(200, {
          msg: "ApiKey updated successfully",
        });
      } catch (error: any) {
        console.log(error.message);
        return status(411, {
          msg: "ApiKey updated unsuccessfully",
        });
      }
    },
    {
      body: ApiKeysModel.updateApiKeySchema,
      response: {
        200: ApiKeysModel.updateApiKeyResponseSchema,
        411: ApiKeysModel.updateApikeyFailureSchema,
      },
    },
  )
  .delete(
    "/:id",
    async ({ userId, params: { id }, status }) => {
      try {
        await ApiKeysService.deleteApiKey(Number(id), Number(userId));
        return status(200, {
          msg: "ApiKey deleted successfully",
        });
      } catch (error: any) {
        console.log(error.message);
        return status(411, {
          msg: "ApiKey deleted unsuccessfully",
        });
      }
    },
    {
      response: {
        200: ApiKeysModel.deleteApiKeyResponseSchema,
        411: ApiKeysModel.deleteApiKeyFailureSchema,
      },
    },
  );
