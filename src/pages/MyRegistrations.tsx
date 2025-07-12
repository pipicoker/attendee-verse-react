import useEventContext from '@/contexts/useEventContexts';
import EventCard from '@/components/EventCard';
import { Calendar, Clock } from 'lucide-react';

const MyRegistrations = () => {
  const { events, registeredEvents } = useEventContext();
  
  const myRegisteredEvents = events.filter(event => registeredEvents.includes(event.id));
  const now = new Date();
  const upcomingRegistrations = myRegisteredEvents.filter(event => new Date(event.date) > now);
  const pastRegistrations = myRegisteredEvents.filter(event => new Date(event.date) <= now);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Registrations</h1>
        <p className="text-gray-600">Events you've registered for</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingRegistrations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Past Events</p>
              <p className="text-2xl font-bold text-gray-900">{pastRegistrations.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Registrations */}
      {upcomingRegistrations.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Events ({upcomingRegistrations.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingRegistrations.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Past Registrations */}
      {pastRegistrations.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Past Events ({pastRegistrations.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastRegistrations.map(event => (
              <EventCard key={event.id} event={event} isPast />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {registeredEvents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No registrations yet</h3>
          <p className="text-gray-500 mb-4">You haven't registered for any events yet.</p>
          <p className="text-sm text-gray-400">Browse events to find something interesting!</p>
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
