
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Layers, Share2, Eye, Menu } from 'lucide-react';
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
      {/* Comment Tool */}
      {commentsEnabled && (
        <div className={cn(
          "fixed bottom-20 right-4 z-50 size-14 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200",
          isDarkMode 
            ? "bg-gray-700/90 border-2 border-blue-400/50 hover:bg-gray-600" 
            : "bg-white/90 border-2 border-blue-500/50 hover:bg-white shadow-md"
        )}>
          <VeltCommentTool darkMode={isDarkMode} />
        </div>
      )}
      
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
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleComments}
                className={cn(
                  "rounded-full text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0",
                  commentsEnabled && "text-white bg-white/10"
                )}
              >
                <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Toggle comments</p>
            </TooltipContent>
          </Tooltip>

          {/* Stack Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
              >
                <Layers className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>View stack</p>
            </TooltipContent>
          </Tooltip>

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

          {/* User Presence with more spacing between icons */}
          <div className="velt-presence flex items-center">
            <VeltPresence />
          </div>

          {/* Vertical divider */}
          <div className="h-5 w-px bg-white/10"></div>

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
