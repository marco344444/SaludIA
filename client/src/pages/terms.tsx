import React from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Scale } from "lucide-react";

const Terms: React.FC = () => {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/register")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al registro
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Términos de Uso</CardTitle>
            <p className="text-sm text-muted-foreground">
              Última actualización: 21 de octubre de 2025
            </p>
          </CardHeader>

          <CardContent className="space-y-6 text-sm">
            {/* Introduction */}
            <section>
              <p className="text-muted-foreground">
                Bienvenido a <strong>MediTranslate AI</strong>. Al usar nuestro servicio, aceptas estos términos. 
                Por favor, léelos cuidadosamente antes de registrarte.
              </p>
            </section>

            {/* Acceptance */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Aceptación de Términos
              </h2>
              <div className="pl-7 space-y-2">
                <p className="text-muted-foreground">
                  Al crear una cuenta y usar MediTranslate AI, confirmas que:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Tienes al menos 18 años de edad</li>
                  <li>Proporcionas información verdadera y precisa</li>
                  <li>Mantendrás tu contraseña segura y confidencial</li>
                  <li>Aceptas cumplir con estos términos y todas las leyes aplicables</li>
                </ul>
              </div>
            </section>

            {/* Service Description */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Descripción del Servicio
              </h2>
              <div className="pl-7 space-y-2">
                <p className="text-muted-foreground">
                  MediTranslate AI proporciona:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Traducción de terminología médica a lenguaje simple</li>
                  <li>Dashboard personal de salud</li>
                  <li>Análisis de archivos médicos (PDF/CSV)</li>
                  <li>Historial de traducciones y análisis</li>
                </ul>
              </div>
            </section>

            {/* Important Disclaimer */}
            <section className="bg-red-50 p-4 rounded-lg border-2 border-red-300 space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                Aviso Médico Importante
              </h2>
              <div className="space-y-2 text-red-900">
                <p className="font-medium">
                  ⚠️ MediTranslate AI NO es un sustituto de consejo médico profesional.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Las traducciones son informativas, no diagnósticos médicos</li>
                  <li>No reemplaza la consulta con profesionales de la salud</li>
                  <li>En emergencias médicas, llama al 911 o acude a urgencias</li>
                  <li>Siempre consulta con tu médico antes de tomar decisiones de salud</li>
                </ul>
              </div>
            </section>

            {/* Permitted Use */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Uso Permitido
              </h2>
              <div className="pl-7">
                <p className="text-muted-foreground mb-2">Puedes usar MediTranslate AI para:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Entender mejor tu información médica personal</li>
                  <li>Llevar registro de tus condiciones y medicamentos</li>
                  <li>Prepararte para consultas médicas</li>
                  <li>Compartir información traducida con profesionales de salud</li>
                </ul>
              </div>
            </section>

            {/* Prohibited Use */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                Uso Prohibido
              </h2>
              <div className="pl-7">
                <p className="text-muted-foreground mb-2">NO puedes usar MediTranslate AI para:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Autodiagnóstico o automedicación sin supervisión médica</li>
                  <li>Reemplazar consultas profesionales con doctores</li>
                  <li>Compartir información médica de terceros sin consentimiento</li>
                  <li>Violar leyes de privacidad o protección de datos</li>
                  <li>Usar para propósitos comerciales o de investigación sin autorización</li>
                  <li>Intentar hackear, dañar o sobrecargar el servicio</li>
                </ul>
              </div>
            </section>

            {/* Accuracy */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Precisión y Limitaciones
              </h2>
              <div className="pl-7 space-y-2">
                <p className="text-muted-foreground">
                  Aunque nos esforzamos por la precisión:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Las traducciones pueden contener errores o simplificaciones excesivas</li>
                  <li>El algoritmo no está entrenado con casos específicos de cada usuario</li>
                  <li>El nivel de confianza es orientativo, no garantía de exactitud</li>
                  <li>Archivos con mala calidad de escaneo pueden analizarse incorrectamente</li>
                </ul>
              </div>
            </section>

            {/* Account Responsibility */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                Responsabilidad de la Cuenta
              </h2>
              <div className="pl-7">
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Eres responsable de toda actividad en tu cuenta</li>
                  <li>No compartas tu contraseña con nadie</li>
                  <li>Notifícanos inmediatamente si detectas acceso no autorizado</li>
                  <li>Podemos suspender cuentas que violen estos términos</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Propiedad Intelectual
              </h2>
              <div className="pl-7 space-y-2">
                <p className="text-muted-foreground">
                  Todos los derechos sobre el software, diseño y algoritmos de MediTranslate AI son propiedad nuestra.
                </p>
                <p className="text-muted-foreground">
                  <strong>Tus datos médicos son siempre tuyos.</strong> Conservas todos los derechos sobre la información 
                  que subes o ingresas en la plataforma.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                Terminación del Servicio
              </h2>
              <div className="pl-7 space-y-2">
                <p className="text-muted-foreground">
                  Puedes cancelar tu cuenta en cualquier momento desde el dashboard. 
                  Nos reservamos el derecho de suspender o terminar cuentas que:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Violen estos términos de uso</li>
                  <li>Realicen actividades ilegales o fraudulentas</li>
                  <li>Intenten comprometer la seguridad del sistema</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                Limitación de Responsabilidad
              </h2>
              <div className="pl-7 space-y-2">
                <p className="text-muted-foreground">
                  En la máxima medida permitida por la ley:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>MediTranslate AI se proporciona "tal cual" sin garantías</li>
                  <li>No somos responsables de decisiones médicas basadas en el servicio</li>
                  <li>No garantizamos disponibilidad ininterrumpida del servicio</li>
                  <li>Nuestra responsabilidad se limita al costo del servicio (actualmente gratuito)</li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h2 className="text-lg font-semibold mb-2">Cambios a estos Términos</h2>
              <p className="text-sm text-muted-foreground">
                Podemos actualizar estos términos ocasionalmente. Te notificaremos por email sobre cambios 
                importantes. El uso continuado del servicio después de modificaciones constituye aceptación 
                de los nuevos términos.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-2">
              <h2 className="text-lg font-semibold">Contacto Legal</h2>
              <p className="text-muted-foreground">
                Para preguntas legales o sobre términos:
              </p>
              <p className="text-muted-foreground">
                📧 Email: <a href="mailto:legal@meditranslate.ai" className="text-blue-600 hover:underline">
                  legal@meditranslate.ai
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
