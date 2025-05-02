import { VeltProvider as BaseVeltProvider, useVeltClient } from "@veltdev/react";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const ORGANIZATION_ID = "default-org";

const USERS = [
  {
    id: "user1",
    name: "John Doe",
    profileUrl: "https://randomuser.me/api/portraits/men/62.jpg"
  },
  {
    id: "user2",
    name: "Jane Smith",
    profileUrl: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

// Context to manage current user
type UserContextType = {
  user: typeof USERS[0] | null;
  switchUser: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  switchUser: () => {}
});

export const useUser = () => useContext(UserContext);

export function VeltProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<typeof USERS[0] | null>(null);
  
  useEffect(() => {
    const savedUserId = localStorage.getItem("currentUserId");
    const savedUser = savedUserId 
      ? USERS.find(u => u.id === savedUserId) 
      : USERS[0];
    
    setUser(savedUser || USERS[0]);
  }, []);

  // Switch between users
  const switchUser = () => {
    const currentIndex = USERS.findIndex(u => u.id === user?.id);
    const nextIndex = (currentIndex + 1) % USERS.length;
    const nextUser = USERS[nextIndex];
    
    localStorage.setItem("currentUserId", nextUser.id);
    setUser(nextUser);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, switchUser }}>
      <BaseVeltProvider apiKey={import.meta.env.VITE_VELT_API_KEY}>
        <VeltUserProvider user={user}>
          {children}
        </VeltUserProvider>
      </BaseVeltProvider>
    </UserContext.Provider>
  );
}

function VeltUserProvider({ 
  children, 
  user 
}: { 
  children: ReactNode; 
  user: typeof USERS[0] 
}) {
  const { client } = useVeltClient();

  useEffect(() => {
    if (client) {
      // Identify user to Velt
      client.identify({
        userId: user.id,
        name: user.name,
        photoUrl: user.profileUrl,
        organizationId: ORGANIZATION_ID
      });
    }
  }, [client, user]);
  
  return <>{children}</>;
}

export function VeltDocumentProvider({ 
  children,
  documentId = "endless-unsplash-gallery"
}: { 
  children: ReactNode;
  documentId?: string;
}) {
  const { client } = useVeltClient();
  
  useEffect(() => {
    if (client) {
      // Set the document context
      client.setDocument(documentId, {
        documentName: "Endless Unsplash Gallery"
      });
    }
  }, [client, documentId]);
  
  return <>{children}</>;
} 