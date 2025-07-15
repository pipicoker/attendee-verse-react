import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axiosInstance from '@/lib/axios';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { useUser } from './UserContext';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  registered: number;
  organizer: string;
  organizerId: string;
  image?: string;
  category: string;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'attendee';
  avatar: string
}


export interface EventContextType {
  events: Event[];
  currentUser: User | null;
  registeredEvents: string[];
  createEvent: (event: Omit<Event, 'id' | 'registered'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  isRegistered: (eventId: string) => boolean;
  canRegister: (event: Event) => boolean;
  isOwner: (event: Event) => boolean;
  eventsLoading: boolean;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {user, loading} = useUser()
    const [events, setEvents] = useState<Event[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

    const [eventsLoading, setEventsLoading] = useState(true)

    useEffect(() => {
        if ( loading) return;

        const fetchInitialData = async () => {
            setEventsLoading(true); // start loading
            if (!user) return
            try {
            const eventsRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/events`);

            let registeredIds: string[] = [];
            try {
                const registeredRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/registrations/user-registrations`);
                registeredIds = registeredRes.data.registrations
              .filter((r) => r.eventId) // ✅ remove null or undefined ones
              .map((r) => r.eventId._id); // ✅ now safe to access _id


            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                registeredIds = []; // no registrations yet
                } else {
                throw err;
                }
            }

           const events = eventsRes.data.map((event) => ({
              ...event,
              id: event._id,
            })) || [];

            setEvents(events);


            setRegisteredEvents(registeredIds);

            setCurrentUser({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role ?? 'attendee',
                avatar: user.avatar
            });
            } catch (err) {
            console.error('Error loading data:', err);
            toast({
                title: 'Error loading events',
                description: 'Please try again later.',
                variant: 'destructive',
            });
            } finally {
            setEventsLoading(false); // done loading
            }
        };

        fetchInitialData();
    }, [user, loading]);



  const createEvent = async (eventData: Omit<Event, 'id' | 'registered'>) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/events`, eventData);
      setEvents(prev => [res.data.event, ...prev]);
      toast({ title: "Event Created", description: "Event successfully created." });
    } catch {
      toast({ title: "Error", description: "Failed to create event", variant: "destructive" });
    }
  };

  const updateEvent = async (id: string, updatedData: Partial<Event>) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/events/${id}`, updatedData);
      setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...updatedData } : e)));
      toast({ title: "Event Updated", description: "Event updated successfully." });
    } catch {
      toast({ title: "Update Failed", description: "Couldn't update the event", variant: "destructive" });
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/events/${id}`);
      setEvents(prev => prev.filter(event => event.id !== id));
      toast({ title: "Event Deleted", description: "Event successfully deleted." });
    } catch {
      toast({ title: "Delete Failed", description: "Couldn't delete the event", variant: "destructive" });
    }
  };

  const registerForEvent = async (eventId: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/registrations/${eventId}/register`);
      setRegisteredEvents(prev => [...prev, eventId]);
      setEvents(prev =>
        prev.map(event =>
          event.id === eventId ? { ...event, registered: event.registered + 1 } : event
        )
      );
      toast({ title: "Registered!", description: "Check your email for confirmation." });
    } catch {
      toast({ title: "Registration Failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const unregisterFromEvent = async (eventId: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/registrations/${eventId}/unregister`);
      setRegisteredEvents(prev => prev.filter(id => id !== eventId));
      setEvents(prev =>
        prev.map(event =>
          event.id === eventId ? { ...event, registered: Math.max(0, event.registered - 1) } : event
        )
      );
      toast({ title: "Unregistered", description: "You have been unregistered from this event." });
    } catch {
      toast({ title: "Failed to Unregister", description: "Try again later.", variant: "destructive" });
    }
  };

  const isRegistered = (eventId: string) => registeredEvents.includes(eventId);
  const canRegister = (event: Event) => new Date(event.date) > new Date() && event.registered < event.capacity && !isRegistered(event.id);
  const isOwner = (event: Event) => currentUser?.id === event.organizerId;

  return (
    <EventContext.Provider value={{
      events,
      currentUser,
      registeredEvents,
      createEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      unregisterFromEvent,
      isRegistered,
      canRegister,
      isOwner,
      eventsLoading
    }}>
      {children}
    </EventContext.Provider>
  );
};
