import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chats } from "./Pages/Chats/Chats";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { People } from "./Pages/People/People";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const [allContacts, setAllContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [estados, setEstados] = useState([]);
  const [User2, setUser2] = useState({});
  const [User1, setUser1] = useState({});
  const [socket, setSocket] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('token');
        const idUser1 = localStorage.getItem("idUser1");
        const headers = { 'Content-Type': 'application/json', 'token': token };
        console.log(User1);
        const body = JSON.stringify({ idUser1: idUser1 });

        try {
          await axios.post('http://localhost:3000/validate', body, { headers });
        } catch (error) {
          setIsAuthenticated(false);
          return;
        }

        try {
          await axios.get(`http://localhost:3000/chat`, body, { headers })
            .then(res => {
              setChats(res.data.chats);
            });

        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
        const source = new EventSource(`http://localhost:3000/clients/${idUser1}/${token}`);

        source.addEventListener('unautorized', (event) => {
          console.log(JSON.parse(event.data));
        });

        source.addEventListener('userContacts', (event) => {
          setContacts(JSON.parse(event.data));
        });

        source.addEventListener('allContacts', (event) => {
          setAllContacts(JSON.parse(event.data))
        });

        source.addEventListener('newUser', (event) => {
          setAllContacts(prevContacts => [...prevContacts, JSON.parse(event.data)])
        });

        source.addEventListener('updateContact', (event) => {
          console.log(event.data);
        });

        source.addEventListener('newEstado', (event) => {
          console.log(JSON.parse(event.data));
          const newEstado = JSON.parse(event.data);
          setContacts(contacts?.map(contact => {
            if (contact._id === newEstado.idUser) {
              contact.estados?.push(newEstado);
              return contact;
            }
            return contact;
          }))
        });
      } catch (error) {
        throw (error);
      }
    };
    if (isAuthenticated) {
      getData();
    }

  }, [isAuthenticated]);
  const handleNewMessage = async (newMessage) => {
    const updatedContacts = contacts.map(contact => {
      if (contact._id == User2?.idUser2) {
        return { ...contact, lastMessage: newMessage };
      }
      return contact;
    });
    setContacts(updatedContacts);
    setChats(chats.map(chat => {
      if (chat.participantes.find(User2?.idUser2)) {
        chat.mensajes.push(newMessage);
        return chat;
      }
      return chat;
    }));
  };

  const initializeWebSocket = () => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Conexión WebSocket abierta');
      setSocket(ws);
    };

    ws.onmessage = async (event) => {
      const dataJson = JSON.parse(event.data);
      console.log('Mensaje recibido desde el servidor:', dataJson);

      switch (dataJson.event) {
        case 'newMessage':
          handleNewMessage(dataJson.newMessage);
          break;
        case 'Messages':
          setChats(prevChats => [...prevChats, dataJson.chat]);
          break;
        case "newChat":
          setChats(prevChats => [...prevChats, dataJson.newChat]);
          break;
        default:
          break;
      }
    };

    ws.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };

    return ws;
  };
  useEffect(() => {

    if (isAuthenticated) {
      const ws = initializeWebSocket();

      return () => {
        if (ws) {
          ws.close();
        }
      };
    }

  }, [isAuthenticated]);

  document.title = 'SocialUP';
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={
          <Login
            setIsAuthenticated={(V) => {
              setIsAuthenticated(V)
            }}
            setUser1={setUser1}
          />
        } />
        <Route path="/Register" element={<Register />} />
        <Route path="/Chats" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} element={
            <Chats
              setAmigos={(newAmigo) => {
                setUser1({ ...User1, amigos: [...User1.amigos, newAmigo] })
              }}
              amigos={User1.amigos}
              idUser2={User2.idUser2}
              estados={estados}
              chat={chats.find(chat => chat.participantes.include(User2.idUser2))}
              socket={socket}
              contacts={contacts}
            />}
          />
        } />
        <Route path="/People" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} element={
            <People
              setUser2={(user, data) => {
                if (!contacts.some(contact => contact._id === user.idUser2)) {
                  setContacts(prevContacts => [...prevContacts, data]);
                }
                setUser2(user);
              }}
              contacts={allContacts} />} />
        } />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
