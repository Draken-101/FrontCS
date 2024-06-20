import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chats } from "./Pages/Chats/Chats";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { People } from "./Pages/People/People";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  document.title = 'SocialUP';
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Login"
          element={
            <Login
            />
          } />
        <Route
          path="/Register"
          element={<Register />} />
        <Route
          path="/Chats"
          element={
            <ProtectedRoute
              element={
                <Chats/>}
            />
          } />
        <Route
          path="/People" element={
            <ProtectedRoute
              element={
                <People />} />
          } />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
