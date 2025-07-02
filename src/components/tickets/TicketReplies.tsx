
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reply } from '@/contexts/TicketContext';
import { useUser } from '@/contexts/UserContext';

interface TicketRepliesProps {
  ticketId: string;
  replies: Reply[];
}

const TicketReplies = ({ replies }: TicketRepliesProps) => {
  const { user } = useUser();

  if (replies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            No replies yet. Start the conversation by adding a reply below.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation ({replies.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {replies.map((reply) => (
            <div 
              key={reply.id} 
              className={`flex ${reply.userId === user.id ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-4 ${
                  reply.userId === user.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">
                      {reply.userName}
                    </span>
                    <Badge 
                      variant={reply.userRole === 'agent' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {reply.userRole}
                    </Badge>
                  </div>
                  <span className={`text-xs ${
                    reply.userId === user.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {reply.createdAt.toLocaleString()}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{reply.message}</p>
                {reply.userId !== user.id && !reply.isRead && (
                  <Badge variant="destructive" className="mt-2 text-xs">
                    New
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketReplies;
