import useEventContext from '@/contexts/useEventContexts';
import EventCard from '@/components/EventCard';
import { Calendar, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  const { events, registeredEvents, currentUser, eventsLoading } = useEventContext();

 if (!currentUser || eventsLoading || !events  ) {
  return <div>Loading user info...</div>;
}

console.log(events)

  
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, {currentUser.name}! 👋
        </h1>
        <p className="text-xl text-gray-600">
          Discover and manage amazing events
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">My Registrations</p>
              <p className="text-2xl font-bold text-gray-900">{registeredEvents?.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">My Events</p>
              <p className="text-2xl font-bold text-gray-900">{myEvents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <span className="text-sm text-gray-500">{upcomingEvents.length} events</span>
        </div>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.slice(0, 6).map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No upcoming events found</p>
          </div>
        )}
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Past Events</h2>
            <span className="text-sm text-gray-500">{pastEvents.length} events</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} isPast />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
