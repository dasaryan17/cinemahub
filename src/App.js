import React, { useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// Ensure these files exist in your src/pages folder
import AddMoviePage from "./pages/AddMoviePage"; 
import EditMoviePage from "./pages/EditMoviePage"; 

export const AuthContext = createContext();

// Protected Route Component (outside of App for performance)
// This checks if the user is an admin before allowing access to a route.
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // If not logged in, redirect to login, saving current location
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (adminOnly && user.role !== 'admin') {
    // If admin required and user is not admin, redirect to home
    return <Navigate to="/" replace alert={{ message: "Access Denied. Admins only." }} />;
  }
  
  return children;
};


function App() {
  // 1. User Auth State (LocalStorage se load)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cinemaHubUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Auth Functions (JWT logic ke saath)
  const login = (userData, token) => { // Ab token bhi accept karta hai
    const userWithToken = { ...userData, token };
    setUser(userWithToken);
    localStorage.setItem("cinemaHubUser", JSON.stringify(userWithToken));
    // Generally token ko httpOnly cookies mein rakhte hain for better security
    // But for local storage approach:
    localStorage.setItem("token", token); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cinemaHubUser");
    localStorage.removeItem("token");
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Example of a public movie details page (optional) */}
            {/* <Route path="/movie/:id" element={<MovieDetailPage />} /> */}

            {/* Admin Routes - Protected (adminOnly=true) */}
            {/* <Route 
              path="/admin/dashboard" 
              element={<ProtectedRoute adminOnly={true}><Dashboard /></ProtectedRoute>} 
            /> */}
            <Route 
              path="/admin/add-movie" 
              element={<ProtectedRoute adminOnly={true}><AddMoviePage /></ProtectedRoute>} 
            />
            <Route 
              path="/admin/edit/:id" 
              element={<ProtectedRoute adminOnly={true}><EditMoviePage /></ProtectedRoute>} 
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
