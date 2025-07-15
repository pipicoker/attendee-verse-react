
import useEventContext from '@/contexts/useEventContexts';
import EventCard from '@/components/EventCard';
import { Calendar, Users, TrendingUp, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  const { events, registeredEvents, currentUser, eventsLoading } = useEventContext();

  if (!currentUser || eventsLoading || !events) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  console.log(events);

  let upcomingEvents = [];
  let pastEvents = [];
  let myEvents = [];

  if (events.length > 0) {
    const now = new Date();
    upcomingEvents = events.filter(event => new Date(event.date) > now);
    pastEvents = events.filter(event => new Date(event.date) <= now);
    myEvents = events.filter(event => event.organizerId === currentUser.id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-yellow-500 mr-3 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {currentUser.name}! 👋
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and manage amazing events with style
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Upcoming Events</p>
                  <p className="text-3xl font-bold text-gray-900">{upcomingEvents.length}</p>
                  <p className="text-xs text-gray-500">Ready to explore</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">My Registrations</p>
                  <p className="text-3xl font-bold text-gray-900">{registeredEvents?.length}</p>
                  <p className="text-xs text-gray-500">Events joined</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">My Events</p>
                  <p className="text-3xl font-bold text-gray-900">{myEvents.length}</p>
                  <p className="text-xs text-gray-500">Created by you</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Ready to create something amazing?</h3>
                <p className="text-blue-100">Start organizing your next event in minutes</p>
              </div>
              <Link to="/my-events">
                <Button size="lg" className="group bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:scale-105 transition-all duration-300">
                  Create Event
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">{upcomingEvents.length} events waiting for you</p>
            </div>
            <Link to="/events">
              <Button variant="outline" className="group hover:scale-105 transition-all duration-200">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(0, 6).map((event, index) => (
                <div key={event._id} className={`animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming events</h3>
                <p className="text-gray-500">Check back later for new events!</p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Events</h2>
                <p className="text-gray-600">{pastEvents.length} events you might have missed</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Past events
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.slice(0, 3).map((event, index) => (
                <div key={event.id} className={`animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} isPast />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Index;
