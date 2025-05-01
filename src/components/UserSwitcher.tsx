import { useState } from 'react';
import { useUser } from '@/lib/velt';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useVeltClient } from '@veltdev/react';

// Same organization ID as in src/lib/velt.tsx
const ORGANIZATION_ID = "default-org";

const UserSwitcher = () => {
  const [open, setOpen] = useState(false);
  const { user, switchUser } = useUser();
  const { client } = useVeltClient();

  const handleUserSwitch = () => {
    switchUser();
    setOpen(false);
    
    // Force reidentify with new user
    if (client && user) {
      client.identify({
        userId: user.id,
        name: user.name,
        photoUrl: user.profileUrl,
        organizationId: ORGANIZATION_ID // Add the required organizationId
      });
    }
  };

  return (
    <>
      <Button 
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
      >
        <Avatar className="h-6 w-6">
          <AvatarImage src={user?.profileUrl} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium truncate max-w-[100px] text-white">
          {user?.name}
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Switch User</DialogTitle>
            <DialogDescription>
              Choose a different user to continue browsing.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={user?.profileUrl} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">Current User</p>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleUserSwitch}>Switch User</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSwitcher; 