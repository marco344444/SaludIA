import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHealthData } from "@/hooks/use-health-data";
import { Heart, Thermometer, Weight, PillBottle, Edit, Plus, Activity, Save, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HealthDashboard() {
  const { healthRecord, updateHealthRecord } = useHealthData();
  const { toast } = useToast();
  
  // Estados para diálogos
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addVitalsOpen, setAddVitalsOpen] = useState(false);
  const [manageMedsOpen, setManageMedsOpen] = useState(false);
  
  // Estados para formularios
  const [age, setAge] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [glucose, setGlucose] = useState("");
  const [weight, setWeight] = useState("");
  const [medName, setMedName] = useState("");
  const [medDosage, setMedDosage] = useState("");
  const [medInstructions, setMedInstructions] = useState("");
  const [medTime, setMedTime] = useState("");

  // Funciones para manejar los formularios
  const handleUpdateProfile = async () => {
    if (!age || isNaN(Number(age))) {
      toast({
        title: "Error",
        description: "Por favor ingresa una edad válida",
        variant: "destructive",
      });
      return;
    }
    
    if (!healthRecord.data?.id) return;
    
    try {
      await updateHealthRecord.mutateAsync({
        id: healthRecord.data.id,
        data: {
          age: Number(age),
        },
      });
      
      toast({
        title: "✅ Perfil actualizado",
        description: "Tu edad se ha actualizado correctamente",
      });
      setEditProfileOpen(false);
      setAge("");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      });
    }
  };

  const handleAddVitals = async () => {
    if (!systolic || !diastolic || !glucose || !weight) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    if (!healthRecord.data?.id) return;
    
    try {
      const currentVitals = healthRecord.data?.vitalSigns || {};
      await updateHealthRecord.mutateAsync({
        id: healthRecord.data.id,
        data: {
          vitalSigns: {
            ...currentVitals,
            bloodPressure: {
              systolic: Number(systolic),
              diastolic: Number(diastolic),
              date: new Date().toISOString(),
            },
            glucose: {
              value: Number(glucose),
              unit: "mg/dL",
              date: new Date().toISOString(),
            },
            weight: {
              value: Number(weight),
              unit: "kg",
              date: new Date().toISOString(),
            },
          },
        },
      });
      
      toast({
        title: "✅ Signos vitales registrados",
        description: "Tus mediciones se han guardado correctamente",
      });
      setAddVitalsOpen(false);
      setSystolic("");
      setDiastolic("");
      setGlucose("");
      setWeight("");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar los signos vitales",
        variant: "destructive",
      });
    }
  };

  const handleAddMedication = async () => {
    if (!medName || !medDosage || !medInstructions || !medTime) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    if (!healthRecord.data?.id) return;
    
    try {
      const currentMeds = healthRecord.data?.medications || [];
      await updateHealthRecord.mutateAsync({
        id: healthRecord.data.id,
        data: {
          medications: [
            ...currentMeds,
            {
              name: medName,
              dosage: medDosage,
              instructions: medInstructions,
              taken: false,
              time: medTime,
            },
          ],
        },
      });
      
      toast({
        title: "✅ Medicamento agregado",
        description: `${medName} se ha agregado a tu lista`,
      });
      setManageMedsOpen(false);
      setMedName("");
      setMedDosage("");
      setMedInstructions("");
      setMedTime("");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el medicamento",
        variant: "destructive",
      });
    }
  };

  const handleToggleMedication = async (index: number) => {
    if (!healthRecord.data?.id) return;
    
    try {
      const currentMeds = healthRecord.data?.medications || [];
      const updatedMeds = currentMeds.map((med: any, i: number) => 
        i === index ? { ...med, taken: !med.taken } : med
      );
      
      await updateHealthRecord.mutateAsync({
        id: healthRecord.data.id,
        data: {
          medications: updatedMeds,
        },
      });
      
      toast({
        title: currentMeds[index].taken ? "Medicamento marcado como pendiente" : "✅ Medicamento tomado",
        description: currentMeds[index].name,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el medicamento",
        variant: "destructive",
      });
    }
  };

  if (!healthRecord.data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Cargando datos de salud...</p>
        </div>
      </div>
    );
  }

  const record = healthRecord.data;

  return (
    <div className="space-y-6" data-testid="health-dashboard">
      {/* Health Overview */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Resumen de Salud</h2>
            <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="button-edit-profile">
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Perfil de Salud</DialogTitle>
                  <DialogDescription>
                    Actualiza tu información básica de salud
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Ej: 45"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setEditProfileOpen(false)}>
                      <X className="w-4 h-4 mr-1" />
                      Cancelar
                    </Button>
                    <Button onClick={handleUpdateProfile}>
                      <Save className="w-4 h-4 mr-1" />
                      Guardar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="text-age">
                {record.age}
              </div>
              <div className="text-xs text-muted-foreground">Años</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary" data-testid="text-conditions-count">
                {record.conditions?.length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Condiciones</div>
            </div>
          </div>

          <div className="space-y-3">
            {record.conditions?.map((condition: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground" data-testid={`text-condition-${index}`}>
                      {condition}
                    </div>
                    <div className="text-xs text-muted-foreground">Controlada</div>
                  </div>
                </div>
                <div className="text-accent text-sm font-medium">Estable</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Signos Vitales</h3>
            <Dialog open={addVitalsOpen} onOpenChange={setAddVitalsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="button-add-vitals">
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Registrar Signos Vitales</DialogTitle>
                  <DialogDescription>
                    Ingresa tus mediciones actuales
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Presión Arterial</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Sistólica (Ej: 120)"
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                      />
                      <span className="flex items-center">/</span>
                      <Input
                        type="number"
                        placeholder="Diastólica (Ej: 80)"
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="glucose">Glucosa (mg/dL)</Label>
                    <Input
                      id="glucose"
                      type="number"
                      placeholder="Ej: 95"
                      value={glucose}
                      onChange={(e) => setGlucose(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="Ej: 68.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setAddVitalsOpen(false)}>
                      <X className="w-4 h-4 mr-1" />
                      Cancelar
                    </Button>
                    <Button onClick={handleAddVitals}>
                      <Save className="w-4 h-4 mr-1" />
                      Guardar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {record.vitalSigns?.bloodPressure && (
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Presión Arterial</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(record.vitalSigns.bloodPressure.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground" data-testid="text-blood-pressure">
                    {record.vitalSigns.bloodPressure.systolic}/{record.vitalSigns.bloodPressure.diastolic}
                  </div>
                  <div className="text-xs text-accent">Normal</div>
                </div>
              </div>
            )}

            {record.vitalSigns?.glucose && (
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Glucosa</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(record.vitalSigns.glucose.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground" data-testid="text-glucose">
                    {record.vitalSigns.glucose.value} {record.vitalSigns.glucose.unit}
                  </div>
                  <div className="text-xs text-accent">Objetivo</div>
                </div>
              </div>
            )}

            {record.vitalSigns?.weight && (
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Weight className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Peso</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(record.vitalSigns.weight.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground" data-testid="text-weight">
                    {record.vitalSigns.weight.value} {record.vitalSigns.weight.unit}
                  </div>
                  <div className="text-xs text-primary">-0.3 kg</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Medication Tracker */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Medicamentos</h3>
            <Dialog open={manageMedsOpen} onOpenChange={setManageMedsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="button-manage-medications">
                  <PillBottle className="w-4 h-4 mr-1" />
                  Gestionar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Agregar Medicamento</DialogTitle>
                  <DialogDescription>
                    Agrega un nuevo medicamento a tu lista
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="medName">Nombre del Medicamento</Label>
                    <Input
                      id="medName"
                      placeholder="Ej: Enalapril 10mg"
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medDosage">Dosis</Label>
                    <Input
                      id="medDosage"
                      placeholder="Ej: 10mg"
                      value={medDosage}
                      onChange={(e) => setMedDosage(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medInstructions">Instrucciones</Label>
                    <Input
                      id="medInstructions"
                      placeholder="Ej: Tomar con el desayuno"
                      value={medInstructions}
                      onChange={(e) => setMedInstructions(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medTime">Hora</Label>
                    <Input
                      id="medTime"
                      type="time"
                      value={medTime}
                      onChange={(e) => setMedTime(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setManageMedsOpen(false)}>
                      <X className="w-4 h-4 mr-1" />
                      Cancelar
                    </Button>
                    <Button onClick={handleAddMedication}>
                      <Plus className="w-4 h-4 mr-1" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {record.medications?.map((medication: any, index: number) => (
              <div 
                key={index} 
                className="flex items-center space-x-4 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleToggleMedication(index)}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <PillBottle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground" data-testid={`text-medication-${index}`}>
                    {medication.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{medication.instructions}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={`text-xs font-medium ${medication.taken ? 'text-accent' : 'text-muted-foreground'}`}>
                      {medication.taken ? 'Tomado' : 'Pendiente'}
                    </div>
                    <div className="text-xs text-muted-foreground">{medication.time}</div>
                  </div>
                  {medication.taken && (
                    <Check className="w-5 h-5 text-accent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
