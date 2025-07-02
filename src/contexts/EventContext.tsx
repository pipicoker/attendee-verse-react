
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

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
}

interface EventContextType {
  events: Event[];
  currentUser: User;
  registeredEvents: string[];
  createEvent: (event: Omit<Event, 'id' | 'registered'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  isRegistered: (eventId: string) => boolean;
  canRegister: (event: Event) => boolean;
  isOwner: (event: Event) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders and cutting-edge technologies.',
    date: '2024-03-15T09:00:00',
    location: 'San Francisco Convention Center',
    capacity: 500,
    registered: 234,
    organizer: 'TechCorp Inc.',
    organizerId: 'org1',
    category: 'Technology',
    price: 299,
  },
  {
    id: '2',
    title: 'Design Workshop',
    description: 'Learn the latest design trends and techniques in this hands-on workshop.',
    date: '2024-03-20T14:00:00',
    location: 'Creative Studio Downtown',
    capacity: 50,
    registered: 35,
    organizer: 'Design Masters',
    organizerId: 'org2',
    category: 'Design',
    price: 149,
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Watch innovative startups pitch their ideas to investors and industry experts.',
    date: '2024-02-10T18:30:00',
    location: 'Innovation Hub',
    capacity: 200,
    registered: 180,
    organizer: 'Startup Accelerator',
    organizerId: 'org3',
    category: 'Business',
    price: 0,
  },
  {
    id: '4',
    title: 'Marketing Summit 2024',
    description: 'Discover the future of digital marketing with expert speakers and networking opportunities.',
    date: '2024-04-05T10:00:00',
    location: 'Grand Hotel Conference Center',
    capacity: 300,
    registered: 156,
    organizer: 'Marketing Pro',
    organizerId: 'user1',
    category: 'Marketing',
    price: 199,
  },
];

const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'organizer',
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [currentUser] = useState<User>(mockUser);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['1', '3']);

  const createEvent = (eventData: Omit<Event, 'id' | 'registered'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      registered: 0,
      organizerId: currentUser.id,
      organizer: currentUser.name,
    };
    setEvents(prev => [newEvent, ...prev]);
    toast({
      title: "Event Created!",
      description: "Your event has been successfully created.",
    });
  };

  const updateEvent = (id: string, updatedData: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedData } : event
    ));
    toast({
      title: "Event Updated!",
      description: "Your event has been successfully updated.",
    });
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    setRegisteredEvents(prev => prev.filter(eventId => eventId !== id));
    toast({
      title: "Event Deleted!",
      description: "The event has been successfully deleted.",
    });
  };

  const registerForEvent = (eventId: string) => {
    setRegisteredEvents(prev => [...prev, eventId]);
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, registered: event.registered + 1 } : event
    ));
    toast({
      title: "Registration Successful! 🎉",
      description: "You have been registered for this event. Check your email for confirmation.",
    });
  };

  const unregisterFromEvent = (eventId: string) => {
    setRegisteredEvents(prev => prev.filter(id => id !== eventId));
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, registered: Math.max(0, event.registered - 1) } : event
    ));
    toast({
      title: "Unregistered Successfully",
      description: "You have been unregistered from this event.",
    });
  };

  const isRegistered = (eventId: string) => registeredEvents.includes(eventId);
  
  const canRegister = (event: Event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate > now && event.registered < event.capacity && !isRegistered(event.id);
  };

  const isOwner = (event: Event) => event.organizerId === currentUser.id;

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
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
