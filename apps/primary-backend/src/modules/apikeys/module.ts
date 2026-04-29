import { t, type UnwrapSchema } from "elysia";

export const ApiKeysModel = {
  createApiKeySchema: t.Object({
    name: t.String(),
  }),

  createApiKeyResponseSchema: t.Object({
    id: t.String(),
    key: t.String(),
  }),

  updateApiKeySchema: t.Object({
    id: t.String(),
    disabled: t.Boolean(),
  }),

  updateApiKeyResponseSchema: t.Object({
    msg: t.Literal("ApiKey updated successfully"),
  }),

  updateApikeyFailureSchema: t.Object({
    msg: t.Literal("ApiKey updated unsuccessfully"),
  }),

  getApiKeyResponseSchema: t.Object({
    apiKeys: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        apiKey: t.String(),
        lastUsed: t.Nullable(t.Date()),
        creditConsumed: t.Number(),
        disabled: t.Boolean(),
      }),
    ),
  }),

  deleteApiKeyResponseSchema: t.Object({
    msg: t.Literal("ApiKey deleted successfully"),
  }),

  deleteApiKeyFailureSchema: t.Object({
    msg: t.Literal("ApiKey deleted unsuccessfully"),
  }),
};

export type ApiKeysModel = {
  [k in keyof typeof ApiKeysModel]: UnwrapSchema<(typeof ApiKeysModel)[k]>;
};
