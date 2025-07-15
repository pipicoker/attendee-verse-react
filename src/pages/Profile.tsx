import { useState } from 'react';
import useEventContext from '@/contexts/useEventContexts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Award, Settings } from 'lucide-react';
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-300">
          <img
            src={
              profileData.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.email}`
            }
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{currentUser?.name}</h1>
        <p className="text-gray-600">{currentUser?.email}</p>
        <Badge
          className={
            currentUser?.role === 'organizer'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-green-100 text-green-800'
          }
        >
  {currentUser?.role?.[0]?.toUpperCase() + currentUser?.role?.slice(1) || ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={currentUser?.name} disabled />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={currentUser?.email} disabled />
              </div>

                <div>
                  <Label htmlFor="avatarUpload">Upload New Avatar</Label>
                  <Input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    className='cursor-pointer'
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
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Your Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Events Registered</span>
                <span className="font-semibold">{registeredEvents.length}</span>
              </div>
              {currentUser?.role === 'organizer' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Events Created</span>
                    <span className="font-semibold">{myEvents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Attendees</span>
                    <span className="font-semibold">{totalAttendees}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Email preferences:</p>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Event reminders</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Registration confirmations</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Marketing emails</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
