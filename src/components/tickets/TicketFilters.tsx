
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTickets } from '@/contexts/TicketContext';

const TicketFilters = () => {
  const { statusFilter, setStatusFilter } = useTickets();

  return (
    <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="open">Open</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="resolved">Resolved</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TicketFilters;
