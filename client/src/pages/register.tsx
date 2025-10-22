import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Stethoscope, User, Lock, UserPlus, Shield, FileText, Heart, Scale, Ruler, Pill, Activity } from "lucide-react";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  // Privacy acceptance
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Health profile (optional)
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [conditions, setConditions] = useState("");
  const [medications, setMedications] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHealthProfile, setShowHealthProfile] = useState(false);
  const { login } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate privacy acceptance
    if (!acceptedPrivacyPolicy || !acceptedTerms) {
      setError("Debes aceptar las políticas de privacidad y los términos de uso");
      return;
    }
    
    setLoading(true);
    try {
      // Prepare request data
      const requestData: any = {
        email,
        password,
        fullName,
        acceptedPrivacyPolicy,
        acceptedTerms,
      };
      
      // Add optional health profile data
      if (age) requestData.age = parseInt(age);
      if (weight) requestData.weight = parseInt(weight);
      if (height) requestData.height = parseInt(height);
      if (conditions) requestData.conditions = conditions.split(',').map(c => c.trim()).filter(c => c);
      if (medications) requestData.medications = medications.split(',').map(m => m.trim()).filter(m => m);
      
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "No se pudo registrar");
      }
      
      const data = await res.json();
      login(data.token, data.user);
      navigate("/app");
    } catch (err: any) {
      setError(err.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl shadow-xl my-8">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Crear cuenta en MediTranslate AI</CardTitle>
          <CardDescription>
            Tu información de salud, segura y privada
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Básica
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre completo *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="María González"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  Usa al menos 8 caracteres con letras y números
                </p>
              </div>
            </div>

            <Separator />

            {/* Health Profile (Optional) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Perfil de Salud (Opcional)
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHealthProfile(!showHealthProfile)}
                  disabled={loading}
                >
                  {showHealthProfile ? "Ocultar" : "Completar ahora"}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Completa tu perfil de salud ahora o hazlo más tarde desde el dashboard
              </p>

              {showHealthProfile && (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Edad
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="35"
                        min="0"
                        max="150"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="flex items-center gap-2">
                        <Scale className="w-4 h-4" />
                        Peso (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        min="1"
                        max="500"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height" className="flex items-center gap-2">
                        <Ruler className="w-4 h-4" />
                        Altura (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="165"
                        min="50"
                        max="300"
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="conditions">Condiciones médicas</Label>
                    <Input
                      id="conditions"
                      type="text"
                      placeholder="Hipertensión, Diabetes (separadas por coma)"
                      value={conditions}
                      onChange={e => setConditions(e.target.value)}
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separa múltiples condiciones con comas
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medications" className="flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Medicamentos actuales
                    </Label>
                    <Input
                      id="medications"
                      type="text"
                      placeholder="Enalapril 10mg, Metformina 500mg (separados por coma)"
                      value={medications}
                      onChange={e => setMedications(e.target.value)}
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separa múltiples medicamentos con comas
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Privacy Policy & Terms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacidad y Términos
              </h3>
              
              <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={acceptedPrivacyPolicy}
                    onCheckedChange={(checked) => setAcceptedPrivacyPolicy(checked as boolean)}
                    disabled={loading}
                    required
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="privacy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Acepto la Política de Privacidad *
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cumplimos con HIPAA. Tus datos están cifrados y nunca se comparten sin tu consentimiento.
                      <button 
                        type="button"
                        className="text-blue-600 hover:underline ml-1"
                        onClick={() => window.open('/privacy-policy', '_blank')}
                      >
                        Leer política completa
                      </button>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    disabled={loading}
                    required
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Acepto los Términos de Uso *
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Al usar MediTranslate AI, aceptas nuestros términos de servicio.
                      <button 
                        type="button"
                        className="text-blue-600 hover:underline ml-1"
                        onClick={() => window.open('/terms', '_blank')}
                      >
                        Leer términos
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Protección de datos médicos:</strong> Toda tu información está cifrada de extremo a extremo.
                  Solo tú puedes acceder a tus datos de salud. Puedes exportar o eliminar tu información en cualquier momento.
                </p>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !acceptedPrivacyPolicy || !acceptedTerms}
            >
              {loading ? "Creando cuenta..." : "Crear mi cuenta"}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">O</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Ya tengo cuenta
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-sm"
            onClick={() => navigate("/app")}
            disabled={loading}
          >
            Continuar sin registrarme
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
