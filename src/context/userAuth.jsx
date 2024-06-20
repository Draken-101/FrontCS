import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initializeWebSocket } from "./WebSocket";
import { ValidateUser } from "./Validation";
import { getData } from "./Data";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [allContacts, setAllContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [estados, setEstados] = useState([]);
  const [User1, setUser1] = useState({});
  const [User2, setUser2] = useState({});
  const [socket, setSocket] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    setIsAuthenticated(ValidateUser(User1));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getData(setChats, setContacts, setAllContacts, User1);
      const ws = initializeWebSocket(setChats, setContacts, User1);
      setSocket(ws);
      return () => {
        if (ws) {
          ws.close();
        }
      };
    }
  }, [isAuthenticated]);

  const value = useMemo(() => ({
    allContacts, setAllContacts,
    chats, setChats,
    contacts, setContacts,
    estados, setEstados,
    User1, setUser1,
    User2, setUser2,
    socket, setSocket,
    isAuthenticated, setIsAuthenticated
  }), [
    allContacts,
    chats,
    contacts,
    estados,
    User1,
    User2,
    socket,
    isAuthenticated
  ]);
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('No hay datos');
  }
  return context;
}
