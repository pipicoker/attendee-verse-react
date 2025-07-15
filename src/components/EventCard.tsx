
import { useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Users, DollarSign, Edit, Trash2, Eye, UserMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Toast } from './ui/toast';
import useEventContext from '@/contexts/useEventContexts';
import EventDialog from './EventDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Event } from '@/contexts/EventProvider';

interface EventCardProps {
  event: Event;
  isPast?: boolean;
  showManageOptions?: boolean;
}

const EventCard = ({ event, isPast = false, showManageOptions = false }: EventCardProps) => {
  const { registerForEvent, unregisterFromEvent, deleteEvent, isRegistered, canRegister, isOwner } = useEventContext();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const { currentUser } = useEventContext();


  const eventDate = new Date(event.date);
  const isEventOwner = isOwner(event);
  const isUserRegistered = isRegistered(event.id);
  const canUserRegister = canRegister(event);
  
  const registrationPercentage = event.capacity > 0 ? (event.registered / event.capacity) * 100 : 0;

 const handleRegisterAndPay = async () => {
  try {
    // If price is 0, just register directly
    if (event.price === 0) {
      registerForEvent(event.id);
      return;
    }

    // Otherwise, initiate Stripe checkout session
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/stripe/create-checkout-session`, {
      eventId: event.id,
      eventName: event.title,
      price: event.price,
      userEmail: currentUser.email,
    });

    window.location.href = res.data.url; // Redirect to Stripe
  } catch (err) {
    console.error(err);
    Toast({
      title: 'Error',
      // description: 'Could not initiate payment',
      variant: 'destructive',
    });
  }
};


  const handleUnregister = () => {
     console.log("Trying to unregister for event:", event);
    unregisterFromEvent(event.id);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
  };

  const getStatusBadge = () => {
    if (isPast) {
      return <Badge variant="secondary">Completed</Badge>;
    }
    if (event.registered >= event.capacity) {
      return <Badge variant="destructive">Full</Badge>;
    }
    if (registrationPercentage > 80) {
      return <Badge className="bg-yellow-500">Almost Full</Badge>;
    }
    return <Badge className="bg-green-500">Available</Badge>;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {event.image && (
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{event.title}</h3>
            {getStatusBadge()}
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              {eventDate.toLocaleDateString()} at {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                {event.registered}/{event.capacity} registered
              </div>
              {event.price > 0 && (
                <div className="flex items-center text-green-600 font-semibold">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {event.price}
                </div>
              )}
            </div>
          </div>

          {/* Registration Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Registration Progress</span>
              <span>{Math.round(registrationPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  registrationPercentage > 80
                    ? 'bg-yellow-500'
                    : registrationPercentage > 60
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {showManageOptions && isEventOwner ? (
              // Event owner actions
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsViewDialogOpen(true)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                {!isPast && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Event</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{event.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        Delete Event
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              // Regular user actions
              <>
                {isUserRegistered ? (
                  <Button
                    variant="outline"
                    onClick={handleUnregister}
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={isPast}
                  >
                    <UserMinus className="h-4 w-4 mr-2" />
                    Unregister
                  </Button>
                ) : (
                  <Button
                    onClick={handleRegisterAndPay}
                    disabled={!canUserRegister}
                    className="flex-1"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {isPast ? 'Event Ended' : canUserRegister ? 'Register' : 'Full'}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <EventDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        mode="edit"
        event={event}
      />

      {/* View Details Dialog */}
      {/* <EventDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        mode="view"
        event={event}
      /> */}
    </>
  );
};

export default EventCard;
