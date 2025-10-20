import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useClinicalAnalysis } from "@/hooks/use-clinical-analysis";
import { Upload, FileText, File, CheckCircle, AlertCircle, Bot, Eye } from "lucide-react";

export default function FileUpload() {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadAndAnalyze } = useClinicalAnalysis();

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    // Validate file type
    if (!fileType.includes('pdf') && !fileType.includes('csv') && !fileName.endsWith('.csv')) {
      toast({
        title: "Archivo no válido",
        description: "Solo se permiten archivos PDF y CSV",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Archivo muy grande",
        description: "El archivo no puede exceder 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await uploadAndAnalyze.mutateAsync(file);
      setAnalysisResult(result);
      toast({
        title: "Análisis completado",
        description: `El archivo ${file.name} ha sido analizado exitosamente.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo analizar el archivo médico",
        variant: "destructive",
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-6" data-testid="file-upload">
      {/* File Upload Area */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Upload className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Analizar Historial Clínico</h2>
                <p className="text-sm text-muted-foreground">Sube archivos PDF o CSV para análisis con IA</p>
              </div>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              data-testid="drop-zone"
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.csv"
                onChange={handleChange}
                data-testid="file-input"
              />
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
                
                <div>
                  <p className="text-lg font-medium text-foreground">
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Archivos PDF y CSV hasta 10MB
                  </p>
                </div>

                <Button
                  onClick={onButtonClick}
                  variant="outline"
                  className="mx-auto"
                  disabled={uploadAndAnalyze.isPending}
                  data-testid="button-select-file"
                >
                  {uploadAndAnalyze.isPending ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <File className="w-4 h-4 mr-2" />
                      Seleccionar Archivo
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <FileText className="w-3 h-3" />
                    <span>PDF</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <File className="w-3 h-3" />
                    <span>CSV</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Result */}
      {analysisResult && (
        <Card className="medical-card" data-testid="analysis-result">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Análisis Completado</h3>
                  <p className="text-sm text-muted-foreground">
                    Archivo: {analysisResult.fileName}
                    {analysisResult.confidence && (
                      <span className="ml-2">• Confianza: {analysisResult.confidence}%</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Resumen del Análisis</h4>
                <p className="text-foreground leading-relaxed" data-testid="text-analysis">
                  {analysisResult.analysis}
                </p>
              </div>

              {analysisResult.keyFindings && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.keyFindings.conditions?.length > 0 && (
                    <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3">
                      <h5 className="flex items-center font-medium text-foreground mb-2">
                        <AlertCircle className="w-4 h-4 mr-2 text-secondary" />
                        Condiciones
                      </h5>
                      <ul className="space-y-1">
                        {analysisResult.keyFindings.conditions.map((condition: string, index: number) => (
                          <li key={index} className="text-sm text-foreground" data-testid={`condition-${index}`}>
                            • {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysisResult.keyFindings.medications?.length > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <h5 className="flex items-center font-medium text-foreground mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                        Medicamentos
                      </h5>
                      <ul className="space-y-1">
                        {analysisResult.keyFindings.medications.map((medication: string, index: number) => (
                          <li key={index} className="text-sm text-foreground" data-testid={`medication-${index}`}>
                            • {medication}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysisResult.keyFindings.vitals?.length > 0 && (
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                      <h5 className="flex items-center font-medium text-foreground mb-2">
                        <Eye className="w-4 h-4 mr-2 text-accent" />
                        Signos Vitales
                      </h5>
                      <ul className="space-y-1">
                        {analysisResult.keyFindings.vitals.map((vital: string, index: number) => (
                          <li key={index} className="text-sm text-foreground" data-testid={`vital-${index}`}>
                            • {vital}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysisResult.keyFindings.recommendations?.length > 0 && (
                    <div className="bg-muted/30 border border-border rounded-lg p-3">
                      <h5 className="flex items-center font-medium text-foreground mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-muted-foreground" />
                        Recomendaciones
                      </h5>
                      <ul className="space-y-1">
                        {analysisResult.keyFindings.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-sm text-foreground" data-testid={`recommendation-${index}`}>
                            • {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}