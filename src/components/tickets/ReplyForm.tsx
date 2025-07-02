
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTickets } from '@/contexts/TicketContext';
import { useUser } from '@/contexts/UserContext';

interface ReplyFormProps {
  ticketId: string;
}

const ReplyForm = ({ ticketId }: ReplyFormProps) => {
  const { addReply } = useTickets();
  const { user } = useUser();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    addReply(ticketId, {
      ticketId,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      message: message.trim(),
      isRead: false
    });

    setMessage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Reply</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Type your reply here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
            required
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!message.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReplyForm;
