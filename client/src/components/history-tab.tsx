import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useClinicalAnalysis } from "@/hooks/use-clinical-analysis";
import { Search, Eye, RotateCcw, Calendar, FileText, File, Bot } from "lucide-react";

export default function HistoryTab() {
  const { translationHistory } = useTranslations();
  const { clinicalAnalyses } = useClinicalAnalysis();

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
                    <Button variant="ghost" size="sm" data-testid={`button-view-${translation.id}`}>
                      <Eye className="w-3 h-3 mr-1" />
                      Ver completo
                    </Button>
                    <Button variant="ghost" size="sm" data-testid={`button-retranslate-${translation.id}`}>
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
                    <Button variant="ghost" size="sm" data-testid={`button-view-analysis-${analysis.id}`}>
                      <Eye className="w-3 h-3 mr-1" />
                      Ver completo
                    </Button>
                    <Button variant="ghost" size="sm" data-testid={`button-reanalyze-${analysis.id}`}>
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
    </div>
  );
}
