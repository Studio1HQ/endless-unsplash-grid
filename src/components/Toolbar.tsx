
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, MessageSquare, User, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ToolbarProps {
  className?: string;
}

const Toolbar = ({ className }: ToolbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    
    toast({
      title: `Theme changed to ${isDarkMode ? 'light' : 'dark'} mode`,
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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className={cn(
          "flex items-center space-x-1 px-3 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-lg",
          isDarkMode ? "dark" : "",
          className
        )}
      >
        {/* Comments Button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => showNotImplemented('Comments')}
          className="rounded-full text-gray-300 hover:text-white hover:bg-white/10"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>

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
        <Avatar className="h-8 w-8 border-2 border-blue-500">
          <AvatarImage src="" />
          <AvatarFallback className="bg-blue-600 text-white text-xs">2</AvatarFallback>
        </Avatar>

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
  );
};

export default Toolbar;
