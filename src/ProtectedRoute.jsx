import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./context/userAuth";

export const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useUserContext();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
    }
  }, []);

  return element;
};