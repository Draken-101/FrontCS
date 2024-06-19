import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chats } from "./Pages/Chats/Chats";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { People } from "./Pages/People/People";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserProvider, useUserContext } from "./context/userAuth";

function App() {
  const {
    allContacts, setAllContacts,
    chats, setChats,
    contacts, setContacts,
    estados, setEstados,
    User1, setUser1,
    User2, setUser2,
    socket, setSocket,
    isAuthenticated, setIsAuthenticated
  } = useUserContext();

  document.title = 'SocialUP';
  
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route
            path="/Login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUser2={setUser2}
                setUser1={setUser1}
              />
            } />
          <Route
            path="/Register"
            element={<Register />} />
          <Route
            path="/Chats"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={
                  <Chats
                    isAuthenticated={isAuthenticated}
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
          <Route
            path="/People" element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={
                  <People
                    isAuthenticated={isAuthenticated}
                    setUser2={(user, data) => {
                      if (!contacts.some(contact => contact._id === user.idUser2)) {
                        setContacts(prevContacts => [...prevContacts, data]);
                      }
                      setUser2(user);
                    }}
                    contacts={allContacts} />} />
            } />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}


export default App;
