import { useContext } from 'react';
import { EventContextType, EventContext } from './EventProvider';

const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export default useEventContext;
