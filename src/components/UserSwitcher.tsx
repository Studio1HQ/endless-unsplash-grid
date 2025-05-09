import { useState } from 'react';
import { useUser } from '@/lib/velt';
import { useVeltClient } from '@veltdev/react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// Same organization ID as in src/lib/velt.tsx
const ORGANIZATION_ID = "default-org";

// Mock users for dropdown display
const mockUsers = [
  {
    id: "user1",
    name: "John Doe",
    profileUrl: "https://randomuser.me/api/portraits/men/62.jpg"
  },
  {
    id: "user2",
    name: "Jane Smith",
    profileUrl: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

const UserSwitcher = () => {
  const [open, setOpen] = useState(false);
  const { user, switchUser } = useUser();
  const { client } = useVeltClient();

  const handleUserSwitch = (userId: string) => {
    switchUser();
    setOpen(false);
    
    // Force reidentify with new user
    if (client && user) {
      client.identify({
        userId: user.id,
        name: user.name,
        photoUrl: user.profileUrl,
        organizationId: ORGANIZATION_ID
      });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 px-1.5 py-1.5 rounded-full hover:bg-white/10 bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer">
          <Avatar className="h-6 w-6 ring-2 ring-green-500">
            <AvatarImage src={user?.profileUrl} alt={user?.name} />
            <AvatarFallback className="text-xs">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 mx-1.5 text-gray-400" strokeWidth={2} />
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-52 p-0 bg-white/95 dark:bg-black/90 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl overflow-hidden">
        {mockUsers.map(mockUser => (
          <DropdownMenuItem 
            key={mockUser.id}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/10 dark:hover:bg-white/5 focus:bg-white/10 dark:focus:bg-white/5"
            onClick={() => handleUserSwitch(mockUser.id)}
          >
            <div className="relative">
              <Avatar className="h-8 w-8 border border-white/10">
                <AvatarImage src={mockUser.profileUrl} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {/* {mockUser.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-black/90"></span>
              )} */}
            </div>
            <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">
              {mockUser.name}
            </span>
            {user?.name === mockUser.name && (
              <div className="h-5 w-5 rounded-full border border-green-500 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSwitcher;
