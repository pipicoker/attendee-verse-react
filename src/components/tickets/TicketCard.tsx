
import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket } from '@/contexts/TicketContext';
import { useUser } from '@/contexts/UserContext';
import TicketStatusBadge from './TicketStatusBadge';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const { user } = useUser();
  
  const unreadCount = ticket.replies.filter(reply => 
    reply.userId !== user.id && !reply.isRead
  ).length;

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors">
                {ticket.subject}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {ticket.message}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <TicketStatusBadge status={ticket.status} />
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{ticket.customerName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{ticket.createdAt.toLocaleDateString()}</span>
              </div>
              {ticket.replies.length > 0 && (
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{ticket.replies.length} replies</span>
                </div>
              )}
            </div>
            <Badge variant="outline" className="text-xs capitalize">
              {ticket.category.replace('-', ' ')}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TicketCard;
