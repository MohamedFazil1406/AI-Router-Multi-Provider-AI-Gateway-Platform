import { useQuery } from "@tanstack/react-query";
import { useElysiaClient } from "../provider/Eden";
import { DashboardLayout } from "../components/DashboardLayout";
import { Button } from "@/components/ui/button";

import {
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

export const ModelPage = () => {
  const elysiaClient = useElysiaClient();
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await elysiaClient.models.get();
      if (response.error) throw new Error("Failed to fetch models");
      return response.data;
    },
  });

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSlug(id);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-neutral-50">Models</h1>
        <p className="text-muted-foreground mb-6">
          Browse and manage your AI models.
        </p>

        {/* Main Content */}
        {modelsQuery.isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : modelsQuery.data?.models.length === 0 ? (
          <p className="text-sm text-muted-foreground">No models available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelsQuery.data?.models.map((model) => (
              <div
                key={model.id}
                className="bg-card rounded-lg border border-border p-4"
              >
                <h2 className="font-semibold text-lg text-neutral-50">
                  {model.name}
                </h2>

                <p className="text-md text-muted-foreground mt-1">
                  {model.description || "No description available"}
                </p>

                <div className="mt-4 flex items-center justify-between border px-2 py-1.5 rounded border-white/20">
                  <span className="text-xs text-neutral-50 truncate">
                    {model.slug}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-neutral-50 shrink-0"
                    onClick={() => copyToClipboard(model.slug, model.id)}
                  >
                    {copiedSlug === model.id ? (
                      <CheckCircle2 className="size-3 text-emerald-400" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
