
import { Link } from 'react-router-dom';
import { Calendar, Users, Ticket, ArrowRight, Star, CheckCircle, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EventHub
              </span>
            </div>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/login">
                <Button variant="outline" className="hover:scale-105 transition-transform">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-transform">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Link to="/login">
                <Button size="sm" variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Manage Events &
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Support Seamlessly
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Create unforgettable events, manage registrations effortlessly, and provide 
              world-class customer support - all in one powerful platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-shadow duration-500">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="Event management dashboard"
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make event management and customer support effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Event Management</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Create, customize, and manage events with our intuitive interface. Track registrations, manage capacity, and grow your audience.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Smart Registration</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Streamline attendee registration with real-time availability, automated confirmations, and seamless check-in processes.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Ticket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Support System</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Provide exceptional customer support with our integrated ticketing system, live chat, and knowledge base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-pulse">
              <div className="text-4xl md:text-6xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Events Created</div>
            </div>
            <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl md:text-6xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl md:text-6xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div className="animate-pulse" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl md:text-6xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of event organizers who trust EventHub to manage their events and support their attendees.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-12 py-6 hover:scale-105 transition-all duration-300 shadow-lg">
              Start Your Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">EventHub</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 EventHub. All rights reserved.</p>
              <p className="text-sm mt-1">Making events extraordinary, one click at a time.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
