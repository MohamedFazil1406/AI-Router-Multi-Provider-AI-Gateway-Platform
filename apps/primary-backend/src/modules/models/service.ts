import { describe } from "bun:test";
import { prisma } from "db";

export abstract class ModelsService {
  static async getModels() {
    const models = await prisma.model.findMany({
      include: {
        company: true,
      },
    });

    return models.map((model) => ({
      id: model.id.toString(),
      name: model.name,
      slug: model.slug,
      description: model.description,
      company: {
        id: model.company.id.toString(),
        name: model.company.name,
        website: model.company.website,
      },
    }));
  }

  static async getProviders() {
    const providers = await prisma.provider.findMany();

    return providers.map((provider) => ({
      id: provider.id.toString(),
      name: provider.name,
      website: provider.website,
    }));
  }

  static async getModelProviders(modelId: number): Promise<
    {
      id: string;
      provider: {
        providerId: string;
        providerName: string;
        providerWebsite: string;
        providerInputTokenCost: number;
        providerOutputTokenCost: number;
      };
    }[]
  > {
    const modelProviders = await prisma.modelProviderMapping.findMany({
      where: {
        modelId,
      },
      include: {
        provider: true,
      },
    });

    return modelProviders.map((mapping) => ({
      id: mapping.id.toString(),
      provider: {
        providerId: mapping.provider.id.toString(),
        providerName: mapping.provider.name,
        providerWebsite: mapping.provider.website,
        providerInputTokenCost: mapping.inputTokenCost,
        providerOutputTokenCost: mapping.outputTokenCost,
      },
    }));
  }
}
