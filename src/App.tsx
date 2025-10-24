import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Correção: Adicionar extensão .tsx às importações das páginas
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// Constante para o caminho base do repositório, facilitando a manutenção
const REPO_BASE_PATH = "/pro-view-panel/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Adiciona a propriedade basename ao BrowserRouter */}
      <BrowserRouter basename={REPO_BASE_PATH}>
        <Routes>
          {/* A rota principal continua sendo "/" */}
          <Route path="/" element={<Index />} />
          {/* Adicione outras rotas customizadas acima da rota curinga "*" */}
          {/* A rota curinga captura qualquer caminho não correspondido */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
