import { useState } from "react";
import { useLocation } from "wouter";
import TranslationForm from "@/components/translation-form";
import HealthDashboard from "@/components/health-dashboard";
import HistoryTab from "@/components/history-tab";
import FileUpload from "@/components/file-upload";
import { useAuth } from "@/context/AuthContext";
import { Bell, Settings, Shield, Lock, CheckCircle, LogOut, User } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"translate" | "dashboard" | "history" | "upload">("translate");
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="medical-app">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 safe-top">
        <div className="max-w-md mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center">
                {user ? (
                  <i className="fas fa-user-md text-primary-foreground text-base sm:text-lg"></i>
                ) : (
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                )}
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-semibold text-foreground" data-testid="app-title">
                  MediTranslate AI
                </h1>
                <p className="text-xs text-muted-foreground" data-testid="user-name">
                  {user ? user.fullName : "Modo Invitado"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {user && (
                <button 
                  className="p-2.5 sm:p-3 text-muted-foreground hover:text-foreground active:bg-muted/50 rounded-lg transition-colors touch-manipulation"
                  data-testid="button-notifications"
                  aria-label="Notificaciones"
                >
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
              {user ? (
                <button 
                  className="p-2.5 sm:p-3 text-muted-foreground hover:text-destructive active:bg-muted/50 rounded-lg transition-colors touch-manipulation"
                  onClick={handleLogout}
                  data-testid="button-logout"
                  aria-label="Cerrar sesión"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              ) : (
                <button 
                  className="px-3 py-2 text-xs sm:text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors touch-manipulation"
                  onClick={() => navigate("/")}
                  data-testid="button-login"
                >
                  Iniciar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-card border-b border-border sticky top-[60px] sm:top-[68px] z-40">
        <div className="max-w-md mx-auto px-2 sm:px-4">
          <div className="flex space-x-0.5 sm:space-x-1 overflow-x-auto mobile-scroll" role="tablist">
            <button
              className={`flex-1 min-w-[80px] py-3 sm:py-3.5 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeTab === "translate"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border active:bg-muted/30"
              }`}
              onClick={() => setActiveTab("translate")}
              role="tab"
              aria-selected={activeTab === "translate"}
              data-testid="tab-translate"
            >
              <i className="fas fa-language mr-1"></i>Traducir
            </button>
            <button
              className={`flex-1 min-w-[80px] py-3 sm:py-3.5 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeTab === "upload"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border active:bg-muted/30"
              }`}
              onClick={() => setActiveTab("upload")}
              role="tab"
              aria-selected={activeTab === "upload"}
              data-testid="tab-upload"
            >
              <i className="fas fa-upload mr-1"></i>Archivos
            </button>
            <button
              className={`flex-1 min-w-[80px] py-3 sm:py-3.5 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeTab === "dashboard"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border active:bg-muted/30"
              }`}
              onClick={() => setActiveTab("dashboard")}
              role="tab"
              aria-selected={activeTab === "dashboard"}
              data-testid="tab-dashboard"
            >
              <i className="fas fa-chart-line mr-1"></i>Dashboard
            </button>
            <button
              className={`flex-1 min-w-[80px] py-3 sm:py-3.5 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeTab === "history"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border active:bg-muted/30"
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
      <main className="flex-1 max-w-md mx-auto w-full px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 mobile-scroll pb-safe">
        {/* Security Badge */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 sm:p-4" data-testid="security-badge">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-accent-foreground">Conexión Segura HIPAA</span>
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent ml-auto flex-shrink-0" />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "translate" && <TranslationForm />}
        {activeTab === "upload" && <FileUpload />}
        {activeTab === "dashboard" && (
          user ? (
            <HealthDashboard />
          ) : (
            <div className="bg-card border border-border rounded-lg p-6 text-center space-y-4">
              <User className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Inicia sesión para ver tu dashboard</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Necesitas una cuenta para acceder a tu información de salud personalizada.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          )
        )}
        {activeTab === "history" && (
          user ? (
            <HistoryTab />
          ) : (
            <div className="bg-card border border-border rounded-lg p-6 text-center space-y-4">
              <User className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Inicia sesión para ver tu historial</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tu historial de traducciones se guarda solo si tienes una cuenta.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Privacy Footer */}
      <footer className="bg-card border-t border-border mt-auto safe-bottom">
        <div className="max-w-md mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-xs text-muted-foreground flex-wrap gap-y-2">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-accent flex-shrink-0" />
              <span>HIPAA Seguro</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-3 h-3 flex-shrink-0" />
              <span>Cifrado E2E</span>
            </div>
            <button 
              className="text-primary hover:text-primary/80 transition-colors touch-manipulation"
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
