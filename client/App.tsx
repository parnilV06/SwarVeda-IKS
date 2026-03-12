import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScienceOfSound from "./pages/ScienceOfSound";
import RagaExplorer from "./pages/RagaExplorer";
import TaalRhythmLab from "./pages/TaalRhythmLab";
import FrequencyVisualizer from "./pages/FrequencyVisualizer";
import PhilosophyOfSound from "./pages/PhilosophyOfSound";
import References from "./pages/References";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/science-of-sound" element={<ScienceOfSound />} />
          <Route path="/raga-explorer" element={<RagaExplorer />} />
          <Route path="/taal-rhythm-lab" element={<TaalRhythmLab />} />
          <Route path="/frequency-visualizer" element={<FrequencyVisualizer />} />
          <Route path="/philosophy-of-sound" element={<PhilosophyOfSound />} />
          <Route path="/references" element={<References />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
