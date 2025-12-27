import React, { useContext } from 'react'; // useContext add kiya
import { NavLink, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AuthContext } from '../App'; // Context import karein
import './Navbar.css';

function Navbar() {
  // LocalStorage ki jagah Context use karein taaki Logout hote hi UI change ho jaye
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Yeh App.js ke logout function ko call karega
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        CINEMA<span>HUB</span>
      </div>
      
      <div className="nav-menu">
        <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
          <HomeIcon className="nav-icon" /> Home
        </NavLink>
        
        {/* Search Page Requirement: Search icon aur link */}
        <NavLink to="/search" className={({isActive}) => isActive ? "active" : ""}>
          <SearchIcon className="nav-icon" /> Search
        </NavLink>
        
        {user ? (
          <>
            {/* Admin Features: Role-based access */}
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "active" : ""}>
              <DashboardIcon className="nav-icon" /> Dashboard
            </NavLink>
            
            {user.role === 'admin' && (
              <NavLink to="/admin/add-movie" className={({isActive}) => isActive ? "active" : ""}>
                <AddBoxIcon className="nav-icon" /> Add Movie
              </NavLink>
            )}
            
            <button onClick={handleLogout} className="logout-btn">
              <LogoutIcon className="nav-icon" /> Logout
            </button>
          </>
        ) : (
          <div className="auth-links" style={{ display: 'flex', gap: '15px' }}>
            <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>
              <LoginIcon className="nav-icon" /> Login
            </NavLink>
            <NavLink to="/signup" className={({isActive}) => isActive ? "active" : ""}>
              <PersonAddIcon className="nav-icon" /> Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;