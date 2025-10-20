import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { HealthRecord } from "@shared/schema";

export function useHealthData() {
  const queryClient = useQueryClient();

  const healthRecord = useQuery<HealthRecord>({
    queryKey: ["/api/health-record"],
  });

  const updateHealthRecord = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<HealthRecord> }) => {
      const response = await apiRequest("PATCH", `/api/health-record/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/health-record"] });
    },
  });

  return {
    healthRecord,
    updateHealthRecord,
  };
}
