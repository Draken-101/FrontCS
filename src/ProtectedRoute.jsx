import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ element, isAuthenticated }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
    }
  }, []);
  
  return element;
};