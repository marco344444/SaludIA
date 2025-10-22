import React from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Lock, Database, Eye, UserCheck, FileText, AlertCircle } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
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
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Política de Privacidad</CardTitle>
            <p className="text-sm text-muted-foreground">
              Última actualización: 21 de octubre de 2025
            </p>
          </CardHeader>

          <CardContent className="space-y-6 text-sm">
            {/* Introduction */}
            <section>
              <p className="text-muted-foreground">
                En <strong>MediTranslate AI</strong>, tu privacidad es nuestra máxima prioridad. 
                Esta política explica cómo recopilamos, usamos, protegemos y compartimos tu información personal y médica.
              </p>
            </section>

            {/* HIPAA Compliance */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Cumplimiento HIPAA
              </h2>
              <div className="pl-7 space-y-2">
                <p>
                  MediTranslate AI cumple con las regulaciones de la <strong>Ley de Portabilidad y Responsabilidad 
                  de Seguros de Salud (HIPAA)</strong> de Estados Unidos:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Toda la información de salud protegida (PHI) está cifrada en tránsito y en reposo</li>
                  <li>Implementamos controles de acceso estrictos y auditorías de seguridad</li>
                  <li>Los datos médicos nunca se comparten con terceros sin consentimiento explícito</li>
                  <li>Realizamos evaluaciones de riesgos periódicas</li>
                </ul>
              </div>
            </section>

            {/* Data Collection */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Información que Recopilamos
              </h2>
              <div className="pl-7 space-y-3">
                <div>
                  <h3 className="font-medium mb-1">Información de Cuenta:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Nombre completo</li>
                    <li>Correo electrónico</li>
                    <li>Contraseña (cifrada con bcrypt)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Información de Salud (Opcional):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Edad, peso, altura</li>
                    <li>Condiciones médicas</li>
                    <li>Medicamentos actuales</li>
                    <li>Diagnósticos traducidos</li>
                    <li>Archivos clínicos (PDF/CSV)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Cómo Usamos tus Datos
              </h2>
              <div className="pl-7">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Traducción Médica:</strong> Procesar y simplificar terminología médica usando 
                    algoritmos locales (sin enviar a terceros)
                  </li>
                  <li>
                    <strong>Dashboard de Salud:</strong> Mostrar tu información de salud de forma personalizada
                  </li>
                  <li>
                    <strong>Análisis de Archivos:</strong> Extraer información clave de PDFs y CSVs médicos
                  </li>
                  <li>
                    <strong>Mejora del Servicio:</strong> Datos agregados y anónimos para mejorar la precisión 
                    del algoritmo
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Protection */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Protección de Datos
              </h2>
              <div className="pl-7">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Cifrado HTTPS:</strong> Todas las comunicaciones usan SSL/TLS</li>
                  <li><strong>Tokens JWT:</strong> Autenticación segura con tokens de 24 horas</li>
                  <li><strong>Hash de contraseñas:</strong> bcrypt con salt rounds de 10</li>
                  <li><strong>Sin terceros:</strong> No compartimos datos con anunciantes o brokers</li>
                  <li><strong>Almacenamiento seguro:</strong> Servidores en Render.com con certificación SOC 2</li>
                </ul>
              </div>
            </section>

            {/* User Rights */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                Tus Derechos
              </h2>
              <div className="pl-7">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Acceso:</strong> Ver toda tu información en cualquier momento</li>
                  <li><strong>Corrección:</strong> Editar datos inexactos desde el dashboard</li>
                  <li><strong>Eliminación:</strong> Solicitar borrado completo de tu cuenta y datos</li>
                  <li><strong>Exportación:</strong> Descargar tus datos en formato JSON</li>
                  <li><strong>Revocación:</strong> Retirar consentimiento en cualquier momento</li>
                </ul>
              </div>
            </section>

            {/* Data Retention */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Retención de Datos
              </h2>
              <div className="pl-7 space-y-2">
                <p className="text-muted-foreground">
                  Conservamos tu información mientras tu cuenta esté activa. Si solicitas eliminar tu cuenta:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Todos los datos se eliminan inmediatamente de nuestros servidores activos</li>
                  <li>Los backups se eliminan en un plazo máximo de 30 días</li>
                  <li>Datos agregados anónimos pueden conservarse para estadísticas</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Contacto
              </h2>
              <div className="pl-7 space-y-2">
                <p className="text-muted-foreground">
                  Para preguntas sobre privacidad o ejercer tus derechos:
                </p>
                <p className="text-muted-foreground">
                  📧 Email: <a href="mailto:privacy@meditranslate.ai" className="text-blue-600 hover:underline">
                    privacy@meditranslate.ai
                  </a>
                </p>
              </div>
            </section>

            {/* Changes */}
            <section className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h2 className="text-lg font-semibold mb-2">Cambios a esta Política</h2>
              <p className="text-sm text-muted-foreground">
                Nos reservamos el derecho de actualizar esta política. Te notificaremos por email 
                sobre cambios significativos. El uso continuado del servicio implica aceptación de los cambios.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
