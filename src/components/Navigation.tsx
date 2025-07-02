
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, BookOpen, Home, Headphones, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';

const Navigation = () => {
  const location = useLocation();
  const { user, toggleRole } = useUser();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/my-registrations', label: 'My Registrations', icon: BookOpen },
    { path: '/tickets', label: 'Support', icon: Headphones },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EventHub</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    location.pathname === path
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
              <Badge variant={user.role === 'agent' ? 'default' : 'secondary'}>
                {user.role === 'agent' ? 'Agent' : 'Customer'}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRole}
                className="text-xs"
              >
                <UserCog className="h-3 w-3 mr-1" />
                Switch Role
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
