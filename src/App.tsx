import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import MyEvents from "./pages/MyEvents";
import MyRegistrations from "./pages/MyRegistrations";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import LandingPage from "./pages/LandingPage";
import { EventProvider } from "./contexts/EventProvider";
import { UserProvider, useUser } from "./contexts/UserContext";
import VerifyEmailSent from "./pages/auth/VerifyEmailSent";
import VerifiedSuccess from "./pages/auth/VerifiedSuccess";
import Success from "./pages/Success";

const queryClient = new QueryClient();

const AppContent = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  const { user, loading } = useUser();


    if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }


  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
        <Route path="/verified-success" element={<VerifiedSuccess />} />
        {/* Redirect all other paths to the landing page */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/success" element={<Success />} />

        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <EventProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </EventProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
