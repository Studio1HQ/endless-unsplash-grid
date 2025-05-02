import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sun, Moon, Globe, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { VeltPresence, useVeltClient, VeltCommentTool } from '@veltdev/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserSwitcher from './UserSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface ToolbarProps {
  className?: string;
}

const environments = [
  { name: "Development", id: "dev" },
  { name: "Staging", id: "staging" },
  { name: "Production", id: "prod" }
];

// Define type for document metadata
interface DocumentMetadata {
  documentName?: string;
  environment?: string;
  organizationId?: string;
  [key: string]: string | number | boolean | undefined;
}

const Toolbar = ({ className }: ToolbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(false);
  const [currentEnv, setCurrentEnv] = useState(environments[0]);
  const [documentMetadata, setDocumentMetadata] = useState<DocumentMetadata | null>(null);
  const [showContextDialog, setShowContextDialog] = useState(false);
  const { toast } = useToast();
  const { client } = useVeltClient();

  // Get document metadata on component mount
  useEffect(() => {
    if (client) {
      const subscription = client.getDocumentMetadata().subscribe((metadata: DocumentMetadata) => {
        setDocumentMetadata(metadata);
      });
      
      return () => subscription.unsubscribe();
    }
  }, [client]);

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

  // Switch environment
  const switchEnvironment = (env: typeof environments[0]) => {
    setCurrentEnv(env);
    
    // If using Velt client, we could set a different document ID based on environment
    if (client) {
      const documentId = `endless-unsplash-gallery-${env.id}`;
      client.setDocument(documentId, {
        documentName: `Endless Unsplash Gallery (${env.name})`,
        environment: env.id
      });
    }
    
    toast({
      title: `Switched to ${env.name} environment`,
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

          {/* Environment Switcher */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Switch environment</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="center" className="w-40">
              {environments.map((env) => (
                <DropdownMenuItem 
                  key={env.id}
                  onClick={() => switchEnvironment(env)}
                  className={cn(
                    "cursor-pointer",
                    currentEnv.id === env.id && "font-bold bg-muted"
                  )}
                >
                  {env.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Context Information */}
          <Dialog open={showContextDialog} onOpenChange={setShowContextDialog}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <Info className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>View document context</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Document Context</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Current Environment</h3>
                <div className="bg-muted p-2 rounded mb-4">
                  <p className="text-sm">{currentEnv.name}</p>
                </div>
                
                <h3 className="text-sm font-medium mb-2">Document Metadata</h3>
                <div className="bg-muted p-2 rounded overflow-auto max-h-40">
                  <pre className="text-xs">
                    {JSON.stringify(documentMetadata, null, 2)}
                  </pre>
                </div>
              </div>
              <DialogClose asChild>
                <Button className="mt-4 w-full" variant="default">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* User Presence */}
          <div className="flex items-center mx-1">
            <VeltPresence />
          </div>

          {/* User Switcher */}
          <UserSwitcher />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
