import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Layers, Share2, Eye, Menu, Inbox } from 'lucide-react';
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
      <VeltComments darkMode={isDarkMode} />
      
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
          {/* Comments Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="rounded-full h-8 w-8 flex items-center justify-center">
                <VeltCommentTool darkMode={isDarkMode}>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={cn(
                      "rounded-full text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0",
                      commentsEnabled && "text-white bg-white/10"
                    )}
                  >
                    <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
                  </Button>
                </VeltCommentTool>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Add comments</p>
            </TooltipContent>
          </Tooltip>

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

          {/* Dark Mode Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
              >
                <Eye className="h-5 w-5" strokeWidth={1.5} />
              </Button>
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