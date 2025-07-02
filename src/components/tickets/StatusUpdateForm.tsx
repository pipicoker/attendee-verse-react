
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTickets, TicketStatus } from '@/contexts/TicketContext';

interface StatusUpdateFormProps {
  ticketId: string;
  currentStatus: TicketStatus;
}

const StatusUpdateForm = ({ ticketId, currentStatus }: StatusUpdateFormProps) => {
  const { updateTicketStatus } = useTickets();

  const handleStatusChange = (newStatus: TicketStatus) => {
    if (newStatus !== currentStatus) {
      updateTicketStatus(ticketId, newStatus);
    }
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="open">Open</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusUpdateForm;
