
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import MyRegistrations from "./pages/MyRegistrations";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import { EventProvider } from "./contexts/EventContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EventProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/events" element={<Events />} />
                <Route path="/my-registrations" element={<MyRegistrations />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </EventProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
