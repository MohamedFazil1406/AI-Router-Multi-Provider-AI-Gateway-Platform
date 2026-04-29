import { t, type UnwrapSchema } from "elysia";

export const PaymentsModel = {
  onrampResponseSchema: t.Object({
    credits: t.Number(),
  }),
  onrampFailureResponseSchema: t.Object({
    msg: t.String(),
  }),
};

export type PaymentsModel = {
  [k in keyof typeof PaymentsModel]: UnwrapSchema<(typeof PaymentsModel)[k]>;
};
