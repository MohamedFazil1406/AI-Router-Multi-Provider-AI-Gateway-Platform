import { Boolean } from "./../../../../../packages/db/generated/prisma/internal/prismaNamespace";
import { prisma } from "db";

const API_KEY_LENGTH = 20;
const ALPHABET =
  "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP1234567890";

export abstract class ApiKeysService {
  static createrandomApiKey(): string {
    let suffixApiKey = "";
    for (let i = 0; i < API_KEY_LENGTH; i++) {
      suffixApiKey += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    return `sk-or-v1-${suffixApiKey}`;
  }

  static async createApiKey(
    name: string,
    userId: number,
  ): Promise<{ id: string; apiKey: string }> {
    const apiKey = ApiKeysService.createrandomApiKey();
    const apiKeyDb = await prisma.apiKey.create({
      data: {
        name,
        apiKey,
        userId,
      },
    });

    return {
      id: apiKeyDb.id.toString(),
      apiKey,
    };
  }

  static async getApiKeys(userId: number) {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId,
        deleted: false,
      },
    });
    return apiKeys.map((apiKey) => ({
      id: apiKey.id.toString(),
      name: apiKey.name,
      apiKey: apiKey.apiKey,
      lastUsed: apiKey.lastUsed,
      creditConsumed: apiKey.creditConsumed,
      disabled: apiKey.disabled,
    }));
  }

  static async updateApiKey(
    userId: number,
    apiKeyId: number,
    disabled: boolean,
  ) {
    await prisma.apiKey.update({
      where: {
        id: apiKeyId,
        userId,
      },
      data: {
        disabled,
      },
    });
  }

  static async deleteApiKey(id: number, userId: number) {
    await prisma.apiKey.update({
      where: {
        id,
        userId,
      },
      data: {
        deleted: true,
      },
    });
  }
}
