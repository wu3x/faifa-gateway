import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

const AppRoutes = () => {
  const location = useLocation();
  const path = normalizePath(location.pathname);

  if (path === "/chat" || path === "/assistant") {
    return <Chat />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  if (typeof window !== "undefined" && window.location.pathname === "/chat" || window.location.pathname === "/faifa-gateway/chat") {
    return <Chat />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
