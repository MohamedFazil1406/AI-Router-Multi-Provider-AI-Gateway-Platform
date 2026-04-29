import { t, type UnwrapSchema } from "elysia";

export const AuthModel = {
  signInBodySchema: t.Object({
    email: t.String(),
    password: t.String(),
  }),

  signInResponseSchema: t.Object({
    msg: t.String(),
  }),

  signInInvalidResponseSchema: t.Object({
    msg: t.String(),
  }),

  signUpBodySchame: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  signUpResponseSchema: t.Object({
    id: t.String(),
  }),
  signUpInvalidResponseSchema: t.Literal("Email already exists"),

  profileResponseSchema: t.Object({
    credits: t.Number(),
  }),

  profileResponseErrorSchema: t.Object({
    msg: t.Literal("Error while fetching user details"),
  }),
};

export type AuthModel = {
  [k in keyof typeof AuthModel]: UnwrapSchema<(typeof AuthModel)[k]>;
};
