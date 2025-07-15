
import useEventContext from '@/contexts/useEventContexts';
import EventCard from '@/components/EventCard';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Ticket, Sparkles, Users, TrendingUp } from 'lucide-react';

const MyRegistrations = () => {
  const { events, registeredEvents } = useEventContext();
  
  const myRegisteredEvents = events.filter(event => registeredEvents.includes(event.id));
  const now = new Date();
  const upcomingRegistrations = myRegisteredEvents.filter(event => new Date(event.date) > now);
  const pastRegistrations = myRegisteredEvents.filter(event => new Date(event.date) <= now);

  const totalEventsValue = myRegisteredEvents.reduce((sum, event) => sum + event.price, 0);
  const avgEventPrice = myRegisteredEvents.length > 0 ? totalEventsValue / myRegisteredEvents.length : 0;

  const statsCards = [
    {
      title: "Upcoming Events",
      value: upcomingRegistrations.length,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      textColor: "text-blue-600"
    },
    {
      title: "Past Events",
      value: pastRegistrations.length,
      icon: Clock,
      color: "from-gray-500 to-gray-600",
      bgColor: "from-gray-50 to-gray-100",
      textColor: "text-gray-600"
    },
    {
      title: "Total Value",
      value: `$${totalEventsValue.toFixed(0)}`,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      textColor: "text-green-600"
    },
    {
      title: "Avg. Price",
      value: `$${avgEventPrice.toFixed(0)}`,
      icon: Ticket,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      textColor: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
                  <Ticket className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Registrations
                </h1>
              </div>
              <p className="text-gray-600">Events you've registered for and attended</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={stat.title} className={`group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br ${stat.bgColor} hover:shadow-2xl animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className={`text-sm font-medium ${stat.textColor} mb-1`}>{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity Overview */}
        {myRegisteredEvents.length > 0 && (
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-6 w-6" />
                <h3 className="text-xl font-bold">Activity Overview</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1">{myRegisteredEvents.length}</div>
                  <div className="text-blue-100">Total Registrations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{((upcomingRegistrations.length / Math.max(myRegisteredEvents.length, 1)) * 100).toFixed(0)}%</div>
                  <div className="text-blue-100">Upcoming Events</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{myRegisteredEvents.filter(e => e.price === 0).length}</div>
                  <div className="text-blue-100">Free Events</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Registrations */}
        {upcomingRegistrations.length > 0 && (
          <section className='px-2'>
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Upcoming Events 
                <span className="text-lg font-normal text-gray-500 ml-2">({upcomingRegistrations.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingRegistrations.map((event, index) => (
                <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Registrations */}
        {pastRegistrations.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-gray-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Past Events 
                <span className="text-lg font-normal text-gray-500 ml-2">({pastRegistrations.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastRegistrations.map((event, index) => (
                <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} isPast />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {registeredEvents.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-2xl"></div>
                <Users className="relative h-16 w-16 text-gray-400 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No registrations yet</h3>
              <p className="text-gray-500 mb-4">You haven't registered for any events yet.</p>
              <p className="text-sm text-gray-400">Browse events to find something interesting!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;
