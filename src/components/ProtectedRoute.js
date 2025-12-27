import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Context se data le rahe hain
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();

  // Spinner logic
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#121212' }}>
        <CircularProgress sx={{ color: '#f5c518' }} />
      </Box>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute; 