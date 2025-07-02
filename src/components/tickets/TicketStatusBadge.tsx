
import { Badge } from '@/components/ui/badge';
import { TicketStatus } from '@/contexts/TicketContext';

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'resolved':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <Badge className={`capitalize ${getStatusColor(status)}`}>
      {status}
    </Badge>
  );
};

export default TicketStatusBadge;
