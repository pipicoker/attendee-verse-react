
import { useState } from 'react';
import useEventContext from '@/contexts/useEventContexts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Award, Settings, Camera, Bell, Shield, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from '@/lib/axios';
import { useUser } from '@/contexts/UserContext';

const Profile = () => {
  const { currentUser, events, registeredEvents } = useEventContext();
  const { login } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    avatar: currentUser?.avatar || '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const myEvents = events.filter(event => event.organizerId === currentUser?.id);
  const totalAttendees = myEvents.reduce((sum, event) => sum + event.registered, 0);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('avatar', selectedFile);
      } else {
        formData.append('avatar', profileData.avatar);
      }

      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/${currentUser?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = {
        ...currentUser,
        avatar: res.data.user.avatar,
      };

      login(updatedUser);

      toast({
        title: 'Profile Updated!',
        description: 'Your avatar has been updated successfully.',
      });

      setIsEditing(false);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update avatar.',
        variant: 'destructive',
      });
    }
  };

  const statsData = [
    {
      label: "Events Registered",
      value: registeredEvents.length,
      icon: Calendar,
      color: "text-blue-600"
    },
    ...(currentUser?.role === 'organizer' ? [
      {
        label: "Events Created",
        value: myEvents.length,
        icon: Award,
        color: "text-green-600"
      },
      {
        label: "Total Attendees",
        value: totalAttendees,
        icon: User,
        color: "text-purple-600"
      }
    ] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="relative inline-block mb-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-gradient-to-r from-blue-300 to-purple-300 shadow-xl">
                  <img
                    src={
                      profileData.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.email}`
                    }
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center space-x-3 mb-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {currentUser?.name}
                </h1>
              </div>
              
              <p className="text-gray-600 mb-4">{currentUser?.email}</p>
              
              <Badge
                className={`${
                  currentUser?.role === 'organizer'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                } px-4 py-2 text-sm font-medium shadow-lg`}
              >
                {currentUser?.role?.[0]?.toUpperCase() + currentUser?.role?.slice(1) || ''}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <span>Profile Information</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="hover:scale-105 transition-all duration-200"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                    <Input 
                      id="name" 
                      value={currentUser?.name} 
                      disabled 
                      className="mt-1 bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={currentUser?.email} 
                      disabled 
                      className="mt-1 bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="avatarUpload" className="text-sm font-medium text-gray-700">Upload New Avatar</Label>
                  <Input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    className='cursor-pointer mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400'
                    disabled={!isEditing}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        setProfileData({ ...profileData, avatar: URL.createObjectURL(file) });
                      }
                    }}
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      onClick={handleSave} 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200"
                    >
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="hover:scale-105 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notifications Settings */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Bell className="h-5 w-5 text-green-600" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">Choose how you want to be notified:</p>
                  <div className="space-y-3">
                    {[
                      { label: "Event reminders", defaultChecked: true },
                      { label: "Registration confirmations", defaultChecked: true },
                      { label: "New events in your area", defaultChecked: false },
                      { label: "Marketing emails", defaultChecked: false }
                    ].map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 group cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={option.defaultChecked} 
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Activity */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span>Your Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {statsData.map((stat, index) => (
                  <div key={stat.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-2">Achievement Unlocked!</h3>
                <p className="text-sm opacity-90">
                  {registeredEvents.length >= 5 ? "Event Enthusiast" : 
                   myEvents.length >= 3 ? "Event Organizer Pro" : "Getting Started"}
                </p>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Shield className="h-5 w-5 text-red-600" />
                  <span>Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Two-factor authentication</span>
                    <Badge variant="outline" className="text-xs">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last login</span>
                    <span className="text-xs text-gray-500">Today</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 hover:scale-105 transition-all duration-200">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
