
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
        variant="ghost"
        onClick={() => setOpen(true)}
        className="h-8 w-8 p-0 rounded-full bg-transparent hover:bg-white/10 transition-colors"
        aria-label="Switch user"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.profileUrl} alt={user?.name} />
          <AvatarFallback className="text-xs">{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
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
              <Avatar className="h-12 w-12 mr-4 border border-white/20">
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
