import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const objet = {
        idUser1: localStorage.getItem("idUser1")
      };
      const headers = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      };
      const body = JSON.stringify(objet);

      try {
        await axios.post('http://localhost:3000/validate', body, { headers });
        setIsAuthenticated(true);
      } catch (error) {
        navigate('/Login')
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, []);
  
  return element;
};