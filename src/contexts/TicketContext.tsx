
import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export type TicketStatus = 'open' | 'pending' | 'resolved';
export type TicketCategory = 'technical' | 'billing' | 'general' | 'bug-report';

export interface Reply {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  userRole: 'customer' | 'agent';
  message: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  message: string;
  category: TicketCategory;
  status: TicketStatus;
  customerId: string;
  customerName: string;
  customerEmail: string;
  assignedAgentId?: string;
  assignedAgentName?: string;
  createdAt: Date;
  updatedAt: Date;
  replies: Reply[];
}

interface TicketContextType {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  statusFilter: TicketStatus | 'all';
  setStatusFilter: (status: TicketStatus | 'all') => void;
  createTicket: (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'replies'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  addReply: (ticketId: string, reply: Omit<Reply, 'id' | 'createdAt'>) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  getTicketById: (id: string) => Ticket | undefined;
  markRepliesAsRead: (ticketId: string, userId: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '1',
    subject: 'Login Issues',
    message: 'I cannot log into my account. Getting error message.',
    category: 'technical',
    status: 'open',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    replies: [
      {
        id: 'r1',
        ticketId: '1',
        userId: 'agent1',
        userName: 'Agent Smith',
        userRole: 'agent',
        message: 'Hi John, I can help you with that. Can you please try clearing your browser cache?',
        createdAt: new Date('2024-01-15T11:30:00Z'),
        isRead: false
      }
    ]
  },
  {
    id: '2',
    subject: 'Billing Question',
    message: 'I was charged twice for the same event registration.',
    category: 'billing',
    status: 'pending',
    customerId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    assignedAgentId: 'agent1',
    assignedAgentName: 'Agent Smith',
    createdAt: new Date('2024-01-14T14:20:00Z'),
    updatedAt: new Date('2024-01-14T15:45:00Z'),
    replies: []
  },
  {
    id: '3',
    subject: 'Feature Request',
    message: 'Would like to see dark mode option in the app.',
    category: 'general',
    status: 'resolved',
    customerId: '3',
    customerName: 'Mike Johnson',
    customerEmail: 'mike.johnson@example.com',
    assignedAgentId: 'agent2',
    assignedAgentName: 'Agent Johnson',
    createdAt: new Date('2024-01-10T09:15:00Z'),
    updatedAt: new Date('2024-01-12T16:30:00Z'),
    replies: [
      {
        id: 'r2',
        ticketId: '3',
        userId: 'agent2',
        userName: 'Agent Johnson',
        userRole: 'agent',
        message: 'Thank you for the suggestion! This has been added to our development roadmap.',
        createdAt: new Date('2024-01-12T16:30:00Z'),
        isRead: true
      }
    ]
  }
];

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const { toast } = useToast();

  const filteredTickets = tickets.filter(ticket => 
    statusFilter === 'all' || ticket.status === statusFilter
  );

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'replies'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      replies: []
    };
    
    setTickets(prev => [newTicket, ...prev]);
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully.",
    });
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id 
        ? { ...ticket, ...updates, updatedAt: new Date() }
        : ticket
    ));
    toast({
      title: "Ticket Updated",
      description: "The ticket has been updated successfully.",
    });
  };

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
    toast({
      title: "Ticket Deleted",
      description: "The ticket has been deleted successfully.",
    });
  };

  const addReply = (ticketId: string, reply: Omit<Reply, 'id' | 'createdAt'>) => {
    const newReply: Reply = {
      ...reply,
      id: Date.now().toString(),
      createdAt: new Date(),
      isRead: false
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            replies: [...ticket.replies, newReply],
            updatedAt: new Date()
          }
        : ticket
    ));

    toast({
      title: "Reply Added",
      description: "Your reply has been sent successfully.",
    });
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id 
        ? { ...ticket, status, updatedAt: new Date() }
        : ticket
    ));
    toast({
      title: "Status Updated",
      description: `Ticket status changed to ${status}.`,
    });
  };

  const getTicketById = (id: string) => {
    return tickets.find(ticket => ticket.id === id);
  };

  const markRepliesAsRead = (ticketId: string, userId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? {
            ...ticket,
            replies: ticket.replies.map(reply => 
              reply.userId !== userId ? { ...reply, isRead: true } : reply
            )
          }
        : ticket
    ));
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      filteredTickets,
      statusFilter,
      setStatusFilter,
      createTicket,
      updateTicket,
      deleteTicket,
      addReply,
      updateTicketStatus,
      getTicketById,
      markRepliesAsRead
    }}>
      {children}
    </TicketContext.Provider>
  );
};
