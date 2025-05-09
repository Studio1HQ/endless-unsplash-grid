import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Layers, Share2, Menu, Inbox, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { VeltPresence, useVeltClient, VeltCommentTool, VeltComments, VeltCommentsSidebar, VeltSidebarButton } from '@veltdev/react';
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [commentsEnabled, setCommentsEnabled] = useState(false);
  const { toast } = useToast();
  const { client } = useVeltClient();

  // Apply dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

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

  return (
    <>
      {/* Enable Comments site-wide */}
      <VeltComments darkMode={isDarkMode} popoverTriangleComponent={false} />
      
      {/* Comments Sidebar */}
      <VeltCommentsSidebar darkMode={isDarkMode} /> 
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-full bg-black backdrop-blur-md border border-white/10 shadow-lg",
            isDarkMode ? "dark" : "",
            className
          )}
        >
          {/* Comments Sidebar Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="rounded-full h-8 w-8 flex items-center justify-center">
                <VeltSidebarButton>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={cn(
                      "rounded-full text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                    )}
                  >
                    <Inbox className="h-5 w-5" strokeWidth={1.5} />
                  </Button>
                </VeltSidebarButton>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>View comments</p>
            </TooltipContent>
          </Tooltip>

          <div className="h-5 w-px bg-white/50"></div>

          {/* Custom Theme Toggle Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <button
                  onClick={toggleDarkMode}
                  className={cn(
                    "relative rounded-full w-10 h-5 flex items-center transition-colors duration-300",
                    isDarkMode ? "bg-blue-500/30" : "bg-yellow-500/30"
                  )}
                  aria-label="Toggle theme"
                >
                  <span 
                    className={cn(
                      "absolute left-0.5 flex items-center justify-center w-4 h-4 rounded-full transition-transform duration-300 shadow-sm",
                      isDarkMode 
                        ? "bg-blue-500 translate-x-5" 
                        : "bg-yellow-500 translate-x-0"
                    )}
                  >
                    {isDarkMode 
                      ? <Moon className="h-2.5 w-2.5 text-white" strokeWidth={2} /> 
                      : <Sun className="h-2.5 w-2.5 text-white" strokeWidth={2} />
                    }
                  </span>
                </button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>

          <div className="h-5 w-px bg-white/50"></div>

          {/* User Presence with more spacing between icons */}
          <div className="velt-presence flex items-center">
            <VeltPresence />
          </div>

          {/* Vertical divider */}
          <div className="h-5 w-px bg-white/50"></div>

          {/* User Switcher */}
          <div>
            <UserSwitcher />
          </div>

          {/* Share Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
              >
                <Share2 className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Share</p>
            </TooltipContent>
          </Tooltip>

          {/* Menu Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
