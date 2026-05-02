import { t, type UnwrapSchema } from "elysia";

export const ModelsModel = {
  getModelsResponseSchema: t.Object({
    models: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        slug: t.String(),
        description: t.Union([t.String(), t.Null()]),
        company: t.Object({
          id: t.String(),
          name: t.String(),
          website: t.String(),
        }),
      }),
    ),
  }),

  getProvidersResponseSchema: t.Object({
    providers: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        website: t.String(),
      }),
    ),
  }),

  getModelsProvidersResponseSchema: t.Object({
    providers: t.Array(
      t.Object({
        id: t.String(),

        provider: t.Object({
          providerId: t.String(),
          providerName: t.String(),
          providerWebsite: t.String(),
          providerInputTokenCost: t.Number(),
          providerOutputTokenCost: t.Number(),
        }),
      }),
    ),
  }),
};

export type ModelsModel = {
  [k in keyof typeof ModelsModel]: UnwrapSchema<(typeof ModelsModel)[k]>;
};
