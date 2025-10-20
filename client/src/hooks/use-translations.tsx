import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Diagnosis, QuickTranslation } from "@shared/schema";

export function useTranslations() {
  const queryClient = useQueryClient();

  const translationHistory = useQuery<Diagnosis[]>({
    queryKey: ["/api/diagnoses"],
  });

  const quickTranslations = useQuery<QuickTranslation[]>({
    queryKey: ["/api/quick-translations"],
  });

  const createTranslation = useMutation({
    mutationFn: async (data: { originalText: string }) => {
      const response = await apiRequest("POST", "/api/translate", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/diagnoses"] });
    },
  });

  return {
    translationHistory,
    quickTranslations,
    createTranslation,
  };
}
