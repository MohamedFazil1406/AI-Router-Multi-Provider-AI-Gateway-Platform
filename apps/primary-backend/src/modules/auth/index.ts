import { Elysia } from "elysia";
import { AuthModel } from "./model";
import { AuthService } from "./service";
import jwt from "@elysiajs/jwt";

export const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET_KEY!,
    }),
  )
  .post(
    "/sign-up",
    async ({ body, status }) => {
      try {
        const userId = await AuthService.signup(body.email, body.password);
        return {
          id: userId,
        };
      } catch (e: any) {
        console.log(e);
        return status(400, "Email already exists");
      }
    },
    {
      body: AuthModel.signUpBodySchame,
      response: {
        200: AuthModel.signUpResponseSchema,
        400: AuthModel.signUpInvalidResponseSchema,
      },
    },
  )
  .post(
    "/sign-in",
    async ({ jwt, body, status, cookie: { auth } }) => {
      try {
        const { CorrectCredential, userId } = await AuthService.signin(
          body.email,
          body.password,
        );

        if (CorrectCredential && userId) {
          const token = await jwt.sign({ userId });
          console.log("Generated JWT token:", token); // Log the generated token for debugging
          auth.set({
            value: token,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
          });

          return {
            msg: "Sign in successful",
          };
        }
        return status(400, { msg: "Invalid email or password" });
      } catch (e: any) {
        console.log(e);
        return status(400, { msg: "Something went wrong" });
      }
    },
    {
      body: AuthModel.signInBodySchema,
      response: {
        200: AuthModel.signInResponseSchema,
        400: AuthModel.signInInvalidResponseSchema,
      },
    },
  )
  .resolve(async ({ cookie: { auth }, status, jwt }) => {
    if (!auth) {
      return status(401);
    }

    const decoded = await jwt.verify(auth.value as string);

    if (!decoded || !decoded.userId) {
      return status(401);
    }

    return {
      userId: decoded.userId as string,
    };
  })
  .get(
    "/profile",
    async ({ userId, status }) => {
      const userData = await AuthService.getUserDetails(Number(userId));
      if (!userData) {
        return status(400, {
          msg: "Error while fetching user details",
        });
      }
      return userData;
    },
    {
      response: {
        200: AuthModel.profileResponseSchema,
        400: AuthModel.profileResponseErrorSchema,
      },
    },
  );
