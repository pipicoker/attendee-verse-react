
import { Event, useEventContext } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Edit, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import EventDialog from './EventDialog';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

const EventCard = ({ event, isPast = false }: EventCardProps) => {
  const { registerForEvent, unregisterFromEvent, deleteEvent, isRegistered, canRegister, isOwner } = useEventContext();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const registered = isRegistered(event.id);
  const eventDate = new Date(event.date);
  const isEventFull = event.registered >= event.capacity;
  
  const getStatusBadge = () => {
    if (isPast) return <Badge variant="secondary">Event Ended</Badge>;
    if (registered) return <Badge className="bg-green-100 text-green-800">Registered</Badge>;
    if (isEventFull) return <Badge variant="destructive">Full</Badge>;
    return <Badge variant="outline">Available</Badge>;
  };

  const getRegistrationButton = () => {
    if (isPast || isOwner(event)) return null;
    
    if (registered) {
      return (
        <Button
          onClick={() => unregisterFromEvent(event.id)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Unregister
        </Button>
      );
    }
    
    if (canRegister(event)) {
      return (
        <Button
          onClick={() => registerForEvent(event.id)}
          size="sm"
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Register Now
        </Button>
      );
    }
    
    return (
      <Button disabled size="sm" className="w-full">
        {isEventFull ? 'Event Full' : 'Registration Closed'}
      </Button>
    );
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
    }
  };

  return (
    <>
      <div className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group",
        isPast && "opacity-80"
      )}>
        {/* Event Image Placeholder */}
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <Calendar className="h-12 w-12 text-white opacity-80" />
          </div>
          <div className="absolute top-4 left-4">
            <Badge className="bg-white text-gray-900">{event.category}</Badge>
          </div>
          <div className="absolute top-4 right-4">
            {getStatusBadge()}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {event.title}
            </h3>
            {isOwner(event) && (
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={() => setIsEditDialogOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              {format(eventDate, 'PPP')} at {format(eventDate, 'p')}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-2" />
              {event.registered} / {event.capacity} registered
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">by {event.organizer}</span>
            <span className="text-lg font-bold text-green-600">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </span>
          </div>

          {getRegistrationButton()}
        </div>
      </div>

      <EventDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        event={event}
        mode="edit"
      />
    </>
  );
};

export default EventCard;
