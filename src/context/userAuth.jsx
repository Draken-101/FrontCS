import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initializeWebSocket } from "./WebSocket";
import { ValidateUser } from "./Validation";
import { getData } from "./Data";

const userContext = createContext(undefined)

export function UserProvider({ children }) {
  const [allContacts, setAllContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [estados, setEstados] = useState([]);
  const [User1, setUser1] = useState({});
  const [User2, setUser2] = useState({});
  const [socket, setSocket] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    setIsAuthenticated(ValidateUser());
    getData(setChats, setContacts, contacts, setAllContacts, allContacts);

  }, []);


  useEffect(() => {

    if (isAuthenticated) {
      const ws = initializeWebSocket(setChats, chats, setContacts);
      setSocket(ws);
      return () => {
        if (ws) {
          ws.close();
        }
      };
    }

  }, [isAuthenticated]);


  const value = useMemo(() => (
    allContacts, setAllContacts,
    chats, setChats,
    contacts, setContacts,
    estados, setEstados,
    User1, setUser1,
    User2, setUser2,
    socket, setSocket,
    isAuthenticated, setIsAuthenticated
  ), [
    allContacts,
    chats,
    contacts,
    estados,
    User1,
    User2,
    socket,
    isAuthenticated
  ])

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}

export function useUserContext() {
  try {
    const context = useContext(userContext);
    console.log(context);
    if (!context) {
      throw new Error('No hay datos')
    }
    const {
      allContacts, setAllContacts,
      chats, setChats,
      contacts, setContacts,
      estados, setEstados,
      User1, setUser1,
      User2, setUser2,
      socket, setSocket,
      isAuthenticated, setIsAuthenticated
    } = context;
    return {
      allContacts, setAllContacts,
      chats, setChats,
      contacts, setContacts,
      estados, setEstados,
      User1, setUser1,
      User2, setUser2,
      socket, setSocket,
      isAuthenticated, setIsAuthenticated
    };
  } catch (error) {
    throw (error)
  }
}