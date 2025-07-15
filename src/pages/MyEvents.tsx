
import { useState } from 'react';
import useEventContext from '@/contexts/useEventContexts';
import EventCard from '@/components/EventCard';
import EventDialog from '@/components/EventDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Calendar, Users, TrendingUp, Eye, Sparkles, BarChart3 } from 'lucide-react';

const MyEvents = () => {
  const { events, currentUser } = useEventContext();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const myEvents = events.filter(event => event.organizerId === currentUser?.id);
  const now = new Date();
  const upcomingEvents = myEvents.filter(event => new Date(event.date) > now);
  const pastEvents = myEvents.filter(event => new Date(event.date) <= now);

  const totalRegistrations = myEvents.reduce((sum, event) => sum + event.registered, 0);
  const averageRegistration = myEvents.length > 0 ? Math.round(totalRegistrations / myEvents.length) : 0;

  const statsCards = [
    {
      title: "Total Events",
      value: myEvents.length,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      textColor: "text-blue-600"
    },
    {
      title: "Total Registrations",
      value: totalRegistrations,
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      textColor: "text-green-600"
    },
    {
      title: "Avg. Registration",
      value: averageRegistration,
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      textColor: "text-purple-600"
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      icon: Eye,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      My Events
                    </h1>
                    <p className="text-gray-600 mt-1">Manage and track your created events</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Create New Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={stat.title} className={`group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br ${stat.bgColor} hover:shadow-2xl animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${stat.textColor} mb-1`}>{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Overview */}
        {myEvents.length > 0 && (
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-6 w-6" />
                <h3 className="text-xl font-bold">Performance Overview</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1">{((upcomingEvents.length / myEvents.length) * 100).toFixed(0)}%</div>
                  <div className="text-blue-100">Active Events</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{totalRegistrations > 0 ? ((totalRegistrations / (myEvents.length * 100)) * 100).toFixed(1) : 0}%</div>
                  <div className="text-blue-100">Capacity Utilized</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{myEvents.length > 0 ? Math.round((totalRegistrations / myEvents.length) * 10) / 10 : 0}</div>
                  <div className="text-blue-100">Success Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Upcoming Events 
                <span className="text-lg font-normal text-gray-500 ml-2">({upcomingEvents.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} showManageOptions />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="h-6 w-6 text-gray-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Past Events 
                <span className="text-lg font-normal text-gray-500 ml-2">({pastEvents.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} isPast showManageOptions />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {myEvents.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-2xl"></div>
                <Calendar className="relative h-16 w-16 text-gray-400 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events created yet</h3>
              <p className="text-gray-500 mb-6">Create your first event to get started with event management</p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Event
              </Button>
            </CardContent>
          </Card>
        )}

        <EventDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          mode="create"
        />
      </div>
    </div>
  );
};

export default MyEvents;
