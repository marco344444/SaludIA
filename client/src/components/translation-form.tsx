import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Stethoscope, MessageSquare, Copy, Share2, Save, Clipboard, Bot } from "lucide-react";

const translationSchema = z.object({
  originalText: z.string().min(1, "El diagnóstico es requerido").max(500, "Máximo 500 caracteres"),
});

type TranslationFormData = z.infer<typeof translationSchema>;

export default function TranslationForm() {
  const { toast } = useToast();
  const [translationResult, setTranslationResult] = useState<{ translatedText: string; confidence: number } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const { createTranslation, quickTranslations } = useTranslations();

  const form = useForm<TranslationFormData>({
    resolver: zodResolver(translationSchema),
    defaultValues: {
      originalText: "",
    },
  });

  const onSubmit = async (data: TranslationFormData) => {
    setIsTranslating(true);
    try {
      const result = await createTranslation.mutateAsync(data);
      setTranslationResult({
        translatedText: result.translatedText,
        confidence: result.confidence || 0,
      });
      form.reset();
      toast({
        title: "Traducción completada",
        description: "El diagnóstico ha sido traducido exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo traducir el diagnóstico. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const pasteExample = () => {
    form.setValue("originalText", "Hipertensión arterial sistólica primaria con episodios de taquicardia sinusal intermitente, asociada a diabetes mellitus tipo 2 descompensada con microalbuminuria incipiente.");
  };

  const copyTranslation = () => {
    if (translationResult) {
      navigator.clipboard.writeText(translationResult.translatedText);
      toast({
        title: "Copiado",
        description: "Traducción copiada al portapapeles.",
      });
    }
  };

  const watchedText = form.watch("originalText");

  return (
    <div className="space-y-6" data-testid="translation-form">
      {/* Diagnosis Input */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Diagnóstico Médico</h2>
                <p className="text-sm text-muted-foreground">Ingrese el diagnóstico técnico</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="originalText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto del Diagnóstico</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ejemplo: Hipertensión arterial sistólica primaria con episodios de taquicardia sinusal intermitente..."
                          className="h-32 resize-none"
                          {...field}
                          data-testid="input-diagnosis"
                        />
                      </FormControl>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {watchedText?.length || 0}/500 caracteres
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={pasteExample}
                          className="text-xs"
                          data-testid="button-paste-example"
                        >
                          <Clipboard className="w-3 h-3 mr-1" />
                          Ejemplo
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full gradient-bg text-primary-foreground"
                  disabled={isTranslating}
                  data-testid="button-translate"
                >
                  {isTranslating ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Traduciendo...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4 mr-2" />
                      Traducir con IA
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>

      {/* Translation Result */}
      {translationResult && (
        <Card className="medical-card" data-testid="translation-result">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Traducción Simple</h3>
                  <p className="text-sm text-muted-foreground">Explicación comprensible</p>
                </div>
              </div>

              <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                <p className="text-foreground leading-relaxed" data-testid="text-translation">
                  {translationResult.translatedText}
                </p>
                {translationResult.confidence > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Confianza: {translationResult.confidence}%
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={copyTranslation}
                  className="flex-1"
                  data-testid="button-copy"
                >
                  <Copy className="w-3 h-3 mr-2" />
                  Copiar
                </Button>
                <Button variant="secondary" size="sm" className="flex-1" data-testid="button-share">
                  <Share2 className="w-3 h-3 mr-2" />
                  Compartir
                </Button>
                <Button variant="secondary" size="sm" className="flex-1" data-testid="button-save">
                  <Save className="w-3 h-3 mr-2" />
                  Guardar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Traducciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickTranslations.data?.map((translation: any) => (
            <Button
              key={translation.id}
              variant="outline"
              className="h-auto p-3 text-left justify-start"
              onClick={() => form.setValue("originalText", translation.medical)}
              data-testid={`button-quick-${translation.id}`}
            >
              <div>
                <div className="text-sm font-medium text-foreground">{translation.medical}</div>
                <div className="text-xs text-muted-foreground mt-1">{translation.simple}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
