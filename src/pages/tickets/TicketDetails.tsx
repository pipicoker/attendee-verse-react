
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useTickets } from '@/contexts/TicketContext';
import { useUser } from '@/contexts/UserContext';
import TicketStatusBadge from '@/components/tickets/TicketStatusBadge';
import TicketReplies from '@/components/tickets/TicketReplies';
import ReplyForm from '@/components/tickets/ReplyForm';
import StatusUpdateForm from '@/components/tickets/StatusUpdateForm';
import EditTicketDialog from '@/components/tickets/EditTicketDialog';

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicketById, deleteTicket, markRepliesAsRead } = useTickets();
  const { user } = useUser();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const ticket = id ? getTicketById(id) : undefined;

  useEffect(() => {
    if (ticket && id) {
      markRepliesAsRead(id, user.id);
    }
  }, [ticket, id, user.id, markRepliesAsRead]);

  if (!ticket) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ticket Not Found</h2>
        <Button onClick={() => navigate('/tickets')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tickets
        </Button>
      </div>
    );
  }

  const canEdit = user.role === 'customer' && 
    ticket.customerId === user.id && 
    ticket.status !== 'resolved';

  const canDelete = user.role === 'customer' && 
    ticket.customerId === user.id && 
    ticket.status !== 'resolved';

  const handleDelete = () => {
    deleteTicket(ticket.id);
    navigate('/tickets');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/tickets')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tickets
        </Button>
        
        <div className="flex items-center space-x-2">
          {canEdit && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowEditDialog(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          
          {canDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Ticket</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this ticket? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>#{ticket.id}</span>
                <span>Created by {ticket.customerName}</span>
                <span>{ticket.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TicketStatusBadge status={ticket.status} />
              {user.role === 'agent' && (
                <StatusUpdateForm ticketId={ticket.id} currentStatus={ticket.status} />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-800 whitespace-pre-wrap">{ticket.message}</p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Category:</span>
                <p className="capitalize">{ticket.category.replace('-', ' ')}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Status:</span>
                <p className="capitalize">{ticket.status}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Last Updated:</span>
                <p>{ticket.updatedAt.toLocaleDateString()}</p>
              </div>
              {ticket.assignedAgentName && (
                <div>
                  <span className="font-medium text-gray-600">Assigned Agent:</span>
                  <p>{ticket.assignedAgentName}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <TicketReplies ticketId={ticket.id} replies={ticket.replies} />
      
      <ReplyForm ticketId={ticket.id} />

      <EditTicketDialog 
        ticket={ticket}
        open={showEditDialog} 
        onOpenChange={setShowEditDialog} 
      />
    </div>
  );
};

export default TicketDetails;
