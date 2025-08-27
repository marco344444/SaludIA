import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ClinicalAnalysis } from "@shared/schema";

export function useClinicalAnalysis() {
  const queryClient = useQueryClient();

  const clinicalAnalyses = useQuery<ClinicalAnalysis[]>({
    queryKey: ["/api/clinical-analyses"],
  });

  const uploadAndAnalyze = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('clinicalFile', file);
      
      const response = await fetch('/api/upload-clinical-file', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al subir el archivo');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clinical-analyses"] });
    },
  });

  return {
    clinicalAnalyses,
    uploadAndAnalyze,
  };
}