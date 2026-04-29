import { prisma } from "db";

export abstract class AuthService {
  static async signup(email: string, password: string): Promise<string> {
    const user = await prisma.user.create({
      data: {
        email,
        password: await Bun.password.hash(password),
      },
    });
    return user.id.toString();
  }
  static async signin(
    email: string,
    password: string,
  ): Promise<{ CorrectCredential: boolean; userId?: string }> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        CorrectCredential: false,
      };
    }
    const isValid = await Bun.password.verify(password, user.password);
    if (!isValid) {
      return {
        CorrectCredential: false,
      };
    }
    return {
      CorrectCredential: true,
      userId: user.id.toString(),
    };
  }

  static async getUserDetails(id: number) {
    return prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        credits: true,
      },
    });
  }
}
