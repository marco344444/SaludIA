import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useTranslations } from "@/hooks/use-translations";
import { useClinicalAnalysis } from "@/hooks/use-clinical-analysis";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, RotateCcw, Calendar, FileText, File, Bot, X, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function HistoryTab() {
  const { translationHistory } = useTranslations();
  const { clinicalAnalyses } = useClinicalAnalysis();
  const { toast } = useToast();
  
  // Estados para modales
  const [selectedTranslation, setSelectedTranslation] = useState<any>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  const [viewTranslationOpen, setViewTranslationOpen] = useState(false);
  const [viewAnalysisOpen, setViewAnalysisOpen] = useState(false);

  // Handler para ver traducción completa
  const handleViewTranslation = (translation: any) => {
    setSelectedTranslation(translation);
    setViewTranslationOpen(true);
  };

  // Handler para retraducir
  const handleRetranslate = (translation: any) => {
    toast({
      title: "🔄 Retraduciendo...",
      description: "Esta función estará disponible próximamente",
    });
  };

  // Handler para ver análisis completo
  const handleViewAnalysis = (analysis: any) => {
    setSelectedAnalysis(analysis);
    setViewAnalysisOpen(true);
  };

  // Handler para re-analizar
  const handleReanalyze = (analysis: any) => {
    toast({
      title: "🤖 Re-analizando...",
      description: "Esta función estará disponible próximamente",
    });
  };

  return (
    <div className="space-y-6" data-testid="history-tab">
      {/* Recent Translations */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Traducciones Recientes</h2>
            <Button variant="ghost" size="sm" data-testid="button-search">
              <Search className="w-4 h-4 mr-1" />
              Buscar
            </Button>
          </div>

          {translationHistory.isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-border rounded-lg p-4 animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4 mb-3"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : translationHistory.data?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No hay traducciones recientes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {translationHistory.data?.map((translation: any) => (
                <div key={translation.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm font-medium text-foreground" data-testid={`text-original-${translation.id}`}>
                      {translation.originalText.length > 50 
                        ? `${translation.originalText.substring(0, 50)}...`
                        : translation.originalText
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {translation.createdAt ? new Date(translation.createdAt).toLocaleDateString() : ''}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3" data-testid={`text-translated-${translation.id}`}>
                    Traducido a: "{translation.translatedText.length > 60 
                      ? `${translation.translatedText.substring(0, 60)}...`
                      : translation.translatedText
                    }"
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewTranslation(translation)}
                      data-testid={`button-view-${translation.id}`}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Ver completo
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRetranslate(translation)}
                      data-testid={`button-retranslate-${translation.id}`}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Retraducir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Health Timeline */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Línea de Tiempo</h3>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-0.5 h-8 bg-border"></div>
              </div>
              <div className="flex-1 pb-4">
                <div className="text-sm font-medium text-foreground" data-testid="event-consultation">
                  Consulta de seguimiento
                </div>
                <div className="text-xs text-muted-foreground">
                  Presión arterial controlada - {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <div className="w-0.5 h-8 bg-border"></div>
              </div>
              <div className="flex-1 pb-4">
                <div className="text-sm font-medium text-foreground" data-testid="event-lab-results">
                  Exámenes de laboratorio
                </div>
                <div className="text-xs text-muted-foreground">
                  Glucosa en ayunas - {new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground" data-testid="event-treatment-start">
                  Inicio de tratamiento
                </div>
                <div className="text-xs text-muted-foreground">
                  Metformina prescrita - {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Analysis History */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Análisis de Archivos</h2>
            <Button variant="ghost" size="sm" data-testid="button-search-files">
              <Search className="w-4 h-4 mr-1" />
              Buscar
            </Button>
          </div>

          {clinicalAnalyses.isLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="border border-border rounded-lg p-4 animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4 mb-3"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : clinicalAnalyses.data?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No hay análisis de archivos</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clinicalAnalyses.data?.map((analysis: any) => (
                <div key={analysis.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        {analysis.fileType === 'pdf' ? (
                          <FileText className="w-4 h-4 text-secondary" />
                        ) : (
                          <File className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground" data-testid={`text-filename-${analysis.id}`}>
                          {analysis.fileName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {analysis.createdAt ? new Date(analysis.createdAt).toLocaleDateString() : ''} •
                          Confianza: {analysis.confidence || 0}%
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      {analysis.fileType}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-3" data-testid={`text-analysis-${analysis.id}`}>
                    {analysis.analysis?.length > 100 
                      ? `${analysis.analysis.substring(0, 100)}...`
                      : analysis.analysis
                    }
                  </div>

                  {analysis.keyFindings && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {analysis.keyFindings.conditions?.length > 0 && (
                        <div className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded">
                          {analysis.keyFindings.conditions.length} condiciones
                        </div>
                      )}
                      {analysis.keyFindings.medications?.length > 0 && (
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                          {analysis.keyFindings.medications.length} medicamentos
                        </div>
                      )}
                      {analysis.keyFindings.vitals?.length > 0 && (
                        <div className="bg-accent/10 text-accent text-xs px-2 py-1 rounded">
                          {analysis.keyFindings.vitals.length} signos vitales
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewAnalysis(analysis)}
                      data-testid={`button-view-analysis-${analysis.id}`}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Ver completo
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleReanalyze(analysis)}
                      data-testid={`button-reanalyze-${analysis.id}`}
                    >
                      <Bot className="w-3 h-3 mr-1" />
                      Re-analizar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal: Ver Traducción Completa */}
      <Dialog open={viewTranslationOpen} onOpenChange={setViewTranslationOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Traducción Completa</DialogTitle>
            <DialogDescription>
              {selectedTranslation?.createdAt 
                ? new Date(selectedTranslation.createdAt).toLocaleDateString('es', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : ''}
            </DialogDescription>
          </DialogHeader>

          {selectedTranslation && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase">Texto Original (Médico)</h4>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedTranslation.originalText}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase">Traducción (Lenguaje Simple)</h4>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedTranslation.translatedText}
                  </p>
                </div>
              </div>

              {selectedTranslation.identifiedTerms && selectedTranslation.identifiedTerms.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase">Términos Identificados</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTranslation.identifiedTerms.map((term: string, index: number) => (
                      <span key={index} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setViewTranslationOpen(false)}>
                  <X className="w-4 h-4 mr-1" />
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal: Ver Análisis Completo */}
      <Dialog open={viewAnalysisOpen} onOpenChange={setViewAnalysisOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAnalysis?.fileType === 'pdf' ? (
                <FileText className="w-5 h-5 text-secondary" />
              ) : (
                <File className="w-5 h-5 text-secondary" />
              )}
              {selectedAnalysis?.fileName}
            </DialogTitle>
            <DialogDescription>
              {selectedAnalysis?.createdAt 
                ? new Date(selectedAnalysis.createdAt).toLocaleDateString('es', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : ''} • Confianza: {selectedAnalysis?.confidence || 0}%
            </DialogDescription>
          </DialogHeader>

          {selectedAnalysis && (
            <div className="space-y-6 py-4">
              {/* Resumen del Análisis */}
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-semibold text-sm text-muted-foreground uppercase">
                  <Bot className="w-4 h-4" />
                  Resumen del Análisis
                </h4>
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedAnalysis.analysis}
                  </p>
                </div>
              </div>

              {/* Hallazgos Clave */}
              {selectedAnalysis.keyFindings && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Condiciones */}
                  {selectedAnalysis.keyFindings.conditions?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 font-semibold text-sm text-secondary">
                        <AlertCircle className="w-4 h-4" />
                        Condiciones Detectadas
                      </h4>
                      <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3">
                        <ul className="space-y-1.5">
                          {selectedAnalysis.keyFindings.conditions.map((condition: string, index: number) => (
                            <li key={index} className="text-sm text-foreground flex items-start gap-2">
                              <span className="text-secondary mt-0.5">•</span>
                              <span>{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Medicamentos */}
                  {selectedAnalysis.keyFindings.medications?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 font-semibold text-sm text-primary">
                        <CheckCircle className="w-4 h-4" />
                        Medicamentos
                      </h4>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <ul className="space-y-1.5">
                          {selectedAnalysis.keyFindings.medications.map((medication: string, index: number) => (
                            <li key={index} className="text-sm text-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{medication}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Signos Vitales */}
                  {selectedAnalysis.keyFindings.vitals?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 font-semibold text-sm text-accent">
                        <Eye className="w-4 h-4" />
                        Signos Vitales
                      </h4>
                      <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                        <ul className="space-y-1.5">
                          {selectedAnalysis.keyFindings.vitals.map((vital: string, index: number) => (
                            <li key={index} className="text-sm text-foreground flex items-start gap-2">
                              <span className="text-accent mt-0.5">•</span>
                              <span>{vital}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Recomendaciones */}
                  {selectedAnalysis.keyFindings.recommendations?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 font-semibold text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4" />
                        Recomendaciones
                      </h4>
                      <div className="bg-muted/30 border border-border rounded-lg p-3">
                        <ul className="space-y-1.5">
                          {selectedAnalysis.keyFindings.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="text-sm text-foreground flex items-start gap-2">
                              <span className="text-muted-foreground mt-0.5">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setViewAnalysisOpen(false)}>
                  <X className="w-4 h-4 mr-1" />
                  Cerrar
                </Button>
                <Button variant="default" onClick={() => handleReanalyze(selectedAnalysis)}>
                  <Bot className="w-4 h-4 mr-1" />
                  Re-analizar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
