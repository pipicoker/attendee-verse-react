
import { Link } from 'react-router-dom';
import { Calendar, Users, Ticket, ArrowRight, Star, CheckCircle, Globe, Zap, Play, ChevronDown, Quote, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "Mar 15, 2024",
      location: "San Francisco, CA",
      attendees: 2500,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      category: "Technology"
    },
    {
      id: 2,
      title: "Digital Marketing Summit",
      date: "Apr 22, 2024",
      location: "New York, NY",
      attendees: 1800,
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&q=80",
      category: "Marketing"
    },
    {
      id: 3,
      title: "Design Workshop",
      date: "May 10, 2024",
      location: "Los Angeles, CA",
      attendees: 500,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
      category: "Design"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
      quote: "EventHub transformed how we manage our conferences. The registration process is seamless and the analytics are incredible."
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "StartupXYZ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      quote: "Best event management platform we've used. Customer support is outstanding and features are exactly what we needed."
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      company: "NonProfit Org",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      quote: "The platform's intuitive design made organizing our charity events effortless. Highly recommend to any organization."
    }
  ];

  const faqs = [
    {
      question: "How quickly can I set up an event?",
      answer: "You can create and publish an event in under 5 minutes. Our intuitive interface guides you through each step, from basic details to advanced settings."
    },
    {
      question: "What payment methods do you support?",
      answer: "We support all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with enterprise-grade encryption."
    },
    {
      question: "Can I customize the registration form?",
      answer: "Yes! Add custom fields, conditional logic, file uploads, and more. Create forms that collect exactly the information you need."
    },
    {
      question: "Do you offer customer support?",
      answer: "We provide 24/7 customer support via chat, email, and phone. Our dedicated support team is here to help you succeed."
    },
    {
      question: "Is there a mobile app?",
      answer: "Yes, we have mobile apps for both iOS and Android. Manage your events and engage with attendees on the go."
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-sm opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EventHub
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Features</Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Pricing</Button>
              <Link to="/login">
                <Button variant="outline" className="hover:scale-105 transition-all duration-200">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200 shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Link to="/login">
                <Button size="sm" variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-8 border border-blue-200/50">
              <Star className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ event organizers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Create Amazing
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Events Effortlessly
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              The all-in-one platform for event management, registration, and customer support. 
              Transform your ideas into unforgettable experiences.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/signup">
              <Button size="lg" className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-xl">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="group w-full sm:w-auto text-lg px-8 py-4 hover:scale-105 transition-all duration-300 border-2">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image with Glassmorphism */}
          <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
                  alt="Event management dashboard"
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make event management effortless and engaging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Event Creation",
                description: "Create stunning events in minutes with our intuitive builder. Customize every detail to match your brand.",
                color: "from-blue-500 to-blue-600",
                delay: "delay-100"
              },
              {
                icon: Users,
                title: "Seamless Registration",
                description: "Streamlined registration process with real-time capacity tracking and automated confirmations.",
                color: "from-green-500 to-green-600",
                delay: "delay-200"
              },
              {
                icon: Ticket,
                title: "24/7 Support System",
                description: "Integrated ticketing system with live chat and knowledge base for exceptional customer experience.",
                color: "from-purple-500 to-purple-600",
                delay: "delay-300"
              },
              {
                icon: TrendingUp,
                title: "Advanced Analytics",
                description: "Deep insights into attendee behavior, registration trends, and event performance metrics.",
                color: "from-orange-500 to-orange-600",
                delay: "delay-400"
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Multi-language support and international payment processing for worldwide events.",
                color: "from-pink-500 to-pink-600",
                delay: "delay-500"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for speed with instant loading and real-time updates across all devices.",
                color: "from-indigo-500 to-indigo-600",
                delay: "delay-600"
              }
            ].map((feature, index) => (
              <Card key={index} className={`group hover:scale-105 transition-all duration-500 ${feature.delay} border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl`}>
                <CardContent className="p-8 text-center">
                  <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="relative z-10 py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing events happening around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <Card key={event.id} className={`group hover:scale-105 transition-all duration-500 delay-${index * 100} border-0 shadow-xl bg-white overflow-hidden`}>
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{event.attendees.toLocaleString()} attending</span>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied event organizers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`hover:scale-105 transition-all duration-500 delay-${index * 100} border-0 shadow-xl bg-gradient-to-br from-white to-gray-50`}>
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-blue-600 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Events Created", delay: "delay-100" },
              { number: "50K+", label: "Happy Users", delay: "delay-200" },
              { number: "99.9%", label: "Uptime", delay: "delay-300" },
              { number: "24/7", label: "Support", delay: "delay-400" }
            ].map((stat, index) => (
              <div key={index} className={`animate-pulse ${stat.delay}`}>
                <div className="text-4xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about EventHub
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl border-0 shadow-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Create Amazing Events?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Join thousands of event organizers who trust EventHub to bring their visions to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 hover:scale-105 transition-all duration-300 shadow-xl font-semibold">
                Start Your Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-xl px-12 py-6 hover:scale-105 transition-all duration-300">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">EventHub</span>
              </div>
              <p className="text-gray-400 max-w-md mb-6">
                The world's leading event management platform. Create, manage, and grow your events with ease.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © 2024 EventHub. All rights reserved. Making events extraordinary.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50"
      >
        <ChevronDown className="h-5 w-5 rotate-180" />
      </button>
    </div>
  );
};

export default LandingPage;
