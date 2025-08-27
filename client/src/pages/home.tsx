import { useState } from "react";
import TranslationForm from "@/components/translation-form";
import HealthDashboard from "@/components/health-dashboard";
import HistoryTab from "@/components/history-tab";
import FileUpload from "@/components/file-upload";
import { Bell, Settings, Shield, Lock, CheckCircle } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"translate" | "dashboard" | "history" | "upload">("translate");

  return (
    <div className="min-h-screen bg-background" data-testid="medical-app">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-user-md text-primary-foreground text-sm"></i>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground" data-testid="app-title">
                  MediTranslate AI
                </h1>
                <p className="text-xs text-muted-foreground" data-testid="user-name">
                  Dr. María García
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-notifications"
              >
                <Bell className="w-4 h-4" />
              </button>
              <button 
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4">
          <div className="flex space-x-1" role="tablist">
            <button
              className={`flex-1 py-3 px-2 text-xs font-medium rounded-t-lg transition-all ${
                activeTab === "translate"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border"
              }`}
              onClick={() => setActiveTab("translate")}
              role="tab"
              aria-selected={activeTab === "translate"}
              data-testid="tab-translate"
            >
              <i className="fas fa-language mr-1"></i>Traducir
            </button>
            <button
              className={`flex-1 py-3 px-2 text-xs font-medium rounded-t-lg transition-all ${
                activeTab === "upload"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border"
              }`}
              onClick={() => setActiveTab("upload")}
              role="tab"
              aria-selected={activeTab === "upload"}
              data-testid="tab-upload"
            >
              <i className="fas fa-upload mr-1"></i>Archivos
            </button>
            <button
              className={`flex-1 py-3 px-2 text-xs font-medium rounded-t-lg transition-all ${
                activeTab === "dashboard"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border"
              }`}
              onClick={() => setActiveTab("dashboard")}
              role="tab"
              aria-selected={activeTab === "dashboard"}
              data-testid="tab-dashboard"
            >
              <i className="fas fa-chart-line mr-1"></i>Dashboard
            </button>
            <button
              className={`flex-1 py-3 px-2 text-xs font-medium rounded-t-lg transition-all ${
                activeTab === "history"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border"
              }`}
              onClick={() => setActiveTab("history")}
              role="tab"
              aria-selected={activeTab === "history"}
              data-testid="tab-history"
            >
              <i className="fas fa-history mr-1"></i>Historial
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Security Badge */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3" data-testid="security-badge">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent-foreground">Conexión Segura HIPAA</span>
            <CheckCircle className="w-4 h-4 text-accent ml-auto" />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "translate" && <TranslationForm />}
        {activeTab === "upload" && <FileUpload />}
        {activeTab === "dashboard" && <HealthDashboard />}
        {activeTab === "history" && <HistoryTab />}
      </main>

      {/* Privacy Footer */}
      <footer className="bg-card border-t border-border mt-8">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-accent" />
              <span>HIPAA Seguro</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Cifrado E2E</span>
            </div>
            <button 
              className="text-primary hover:text-primary/80 transition-colors"
              data-testid="link-privacy"
            >
              Privacidad
            </button>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-2">
            © 2024 MediTranslate AI - Cumple con HIPAA
          </div>
        </div>
      </footer>
    </div>
  );
}
