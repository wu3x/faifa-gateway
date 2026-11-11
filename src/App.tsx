import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
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
      <Route path="/admin" element={<Admin />} />
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
          <BrowserRouter basename="/faifa-gateway">
            <AppRoutes />
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
