
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, MessageSquare, User, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
    <header
      className={cn(
        "toolbar sticky top-0 z-50 w-full px-4 py-3 border-b shadow-sm backdrop-blur-md",
        isDarkMode ? "dark border-gray-800" : "border-gray-200",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Environment Indicator */}
          <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
            Masonry Gallery
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Comments Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => showNotImplemented('Comments')}
            className="rounded-full"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Dark Mode Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* User Presence */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => showNotImplemented('User profile')}
            className="rounded-full"
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Settings Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => showNotImplemented('Settings')}
            className="rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
