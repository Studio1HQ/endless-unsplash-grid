
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, SquareStack, Share, Eye } from 'lucide-react';
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

// Define type for document metadata
interface DocumentMetadata {
  documentName?: string;
  environment?: string;
  organizationId?: string;
  [key: string]: string | number | boolean | undefined;
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
            "flex items-center gap-0 px-1 py-1.5 rounded-full bg-[#111111] backdrop-blur-md border border-white/10 shadow-lg",
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
                  "rounded-full text-gray-300 hover:text-white hover:bg-white/10 mx-1",
                  commentsEnabled && "text-blue-400 bg-white/10"
                )}
              >
                <MessageSquare className="h-5 w-5" />
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
                className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 mx-1"
              >
                <SquareStack className="h-5 w-5" />
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
                className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 mx-1"
              >
                <Eye className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-600 mx-1.5"></div>

          {/* User Presence with proper spacing */}
          <div className="flex items-center -space-x-1 mx-1.5">
            <VeltPresence />
          </div>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-600 mx-1.5"></div>

          {/* Share Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 mx-1"
              >
                <Share className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Share</p>
            </TooltipContent>
          </Tooltip>

          {/* User Switcher */}
          <UserSwitcher />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
