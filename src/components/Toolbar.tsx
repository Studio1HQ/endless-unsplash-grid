import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, MessageSquare, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { VeltPresence, useVeltClient, VeltCommentTool } from '@veltdev/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserSwitcher from './UserSwitcher';

interface ToolbarProps {
  className?: string;
}

const Toolbar = ({ className }: ToolbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(false);
  const { toast } = useToast();
  const { client } = useVeltClient();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    
    toast({
      title: `Theme changed to ${isDarkMode ? 'light' : 'dark'} mode`,
      duration: 1500,
    });
  };

  // Toggle comments mode
  const toggleComments = () => {
    setCommentsEnabled(!commentsEnabled);
    
    toast({
      title: `Comments ${!commentsEnabled ? 'enabled' : 'disabled'}`,
      duration: 1500,
    });
  };

  // Show a feature not implemented message
  const showNotImplemented = (feature: string) => {
    toast({
      title: `${feature} feature coming soon!`,
      description: "This functionality will be implemented in a future update.",
      duration: 2000,
    });
  };

  return (
    <>
      {/* Comment Tool */}
      {commentsEnabled && (
        <div className="fixed bottom-20 right-4 z-50">
          <VeltCommentTool />
        </div>
      )}
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-lg",
            isDarkMode ? "dark" : "",
            className
          )}
        >
          {/* Comments Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleComments}
                className={cn(
                  "rounded-full text-gray-300 hover:text-white hover:bg-white/10",
                  commentsEnabled && "text-blue-400 bg-white/10"
                )}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Toggle comments mode</p>
            </TooltipContent>
          </Tooltip>

          {/* Dark Mode Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full text-gray-300 hover:text-white hover:bg-white/10"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* User Presence */}
          <div className="flex items-center mx-1">
            <VeltPresence />
          </div>

          {/* User Switcher */}
          <UserSwitcher />

          {/* Settings Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => showNotImplemented('Settings')}
            className="rounded-full text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
