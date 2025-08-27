import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHealthData } from "@/hooks/use-health-data";
import { Heart, Thermometer, Weight, PillBottle, Edit, Plus, Activity } from "lucide-react";

export default function HealthDashboard() {
  const { healthRecord } = useHealthData();

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
            <Button variant="ghost" size="sm" data-testid="button-edit-profile">
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Button>
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
            <Button variant="ghost" size="sm" data-testid="button-add-vitals">
              <Plus className="w-4 h-4 mr-1" />
              Agregar
            </Button>
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
            <Button variant="ghost" size="sm" data-testid="button-manage-medications">
              <PillBottle className="w-4 h-4 mr-1" />
              Gestionar
            </Button>
          </div>

          <div className="space-y-3">
            {record.medications?.map((medication: any, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <PillBottle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground" data-testid={`text-medication-${index}`}>
                    {medication.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{medication.instructions}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${medication.taken ? 'text-accent' : 'text-muted-foreground'}`}>
                    {medication.taken ? 'Tomado' : 'Pendiente'}
                  </div>
                  <div className="text-xs text-muted-foreground">{medication.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
