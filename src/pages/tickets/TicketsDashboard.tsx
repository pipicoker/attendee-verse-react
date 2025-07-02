
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTickets } from '@/contexts/TicketContext';
import { useUser } from '@/contexts/UserContext';
import TicketCard from '@/components/tickets/TicketCard';
import CreateTicketDialog from '@/components/tickets/CreateTicketDialog';
import TicketFilters from '@/components/tickets/TicketFilters';

const TicketsDashboard = () => {
  const { filteredTickets, statusFilter } = useTickets();
  const { user } = useUser();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const userTickets = filteredTickets.filter(ticket => 
    user.role === 'customer' ? ticket.customerId === user.id : true
  );

  const getStatusCount = (status: string) => {
    if (status === 'all') return userTickets.length;
    return userTickets.filter(ticket => ticket.status === status).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === 'customer' ? 'My Support Tickets' : 'Support Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user.role === 'customer' 
              ? 'Manage your support requests and track their progress'
              : 'Manage customer support tickets and provide assistance'
            }
          </p>
        </div>
        
        {user.role === 'customer' && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Tickets</CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              {getStatusCount('all')}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Open</CardTitle>
            <CardDescription className="text-2xl font-bold text-red-600">
              {getStatusCount('open')}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <CardDescription className="text-2xl font-bold text-yellow-600">
              {getStatusCount('pending')}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
            <CardDescription className="text-2xl font-bold text-green-600">
              {getStatusCount('resolved')}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Support Tickets</CardTitle>
            <TicketFilters />
          </div>
        </CardHeader>
        <CardContent>
          {userTickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {statusFilter === 'all' 
                  ? 'No tickets found.' 
                  : `No ${statusFilter} tickets found.`
                }
              </p>
              {user.role === 'customer' && statusFilter === 'all' && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowCreateDialog(true)}
                >
                  Create Your First Ticket
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {userTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CreateTicketDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
};

export default TicketsDashboard;
