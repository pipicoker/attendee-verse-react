import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useEventContext from '@/contexts/useEventContexts'; 
import { toast } from '@/hooks/use-toast'; 

const Success = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const { registerForEvent } = useEventContext();

 useEffect(() => {
  const registerAfterPayment = async () => {
    if (!eventId) return;
    try {
      await registerForEvent(eventId);
      toast({
        title: 'Registration Confirmed',
        description: 'You have successfully registered for the event.',
        variant: 'default', // ✅ corrected
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Payment succeeded, but registration failed.',
        variant: 'destructive',
      });
    }
  };

  registerAfterPayment();
}, [eventId, registerForEvent]);


  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-gray-700">Thanks for your payment! Completing your registration...</p>
    </div>
  );
};

export default Success;
