import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

import Dashboard from "@/pages/Dashboard";
import RegisterBatch from "@/pages/RegisterBatch";
import TrackBatches from "@/pages/TrackBatches";
import VerifyBatch from "@/pages/VerifyBatch";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/registrar" component={RegisterBatch} />
      <Route path="/rastrear" component={TrackBatches} />
      <Route path="/verificar" component={VerifyBatch} />
      <Route path="/relatorios" component={Reports} />
      <Route path="/configuracoes" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <SidebarProvider style={sidebarStyle as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="h-16 flex items-center justify-between gap-4 px-4 border-b bg-background sticky top-0 z-50">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="hidden sm:flex items-center gap-1">
                      <Wallet className="h-3 w-3" />
                      <span className="hidden md:inline">Polygon Mumbai</span>
                    </Badge>
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1 overflow-auto p-6 md:p-8">
                  <div className="max-w-7xl mx-auto">
                    <Router />
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
