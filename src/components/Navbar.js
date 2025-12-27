import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar, IconButton, Tooltip } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Ultra-Modern Style Helper
  const navButtonStyle = (path) => ({
    color: location.pathname === path ? '#F5C518' : 'rgba(255,255,255,0.7)',
    mx: 1.5,
    fontWeight: '700',
    fontSize: '0.8rem',
    letterSpacing: '1.5px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    '&:hover': {
      color: '#F5C518',
      backgroundColor: 'transparent',
      transform: 'translateY(-2px)',
      '&:after': { width: '100%', left: '0%' }
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      width: location.pathname === path ? '100%' : '0%',
      height: '3px',
      bottom: '-8px',
      left: location.pathname === path ? '0%' : '50%',
      backgroundColor: '#F5C518',
      borderRadius: '2px',
      transition: 'all 0.3s ease-in-out',
      boxShadow: location.pathname === path ? '0px 0px 8px #F5C518' : 'none'
    },
  });

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(26, 26, 26, 0.8)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        backgroundImage: 'none' 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          
          {/* LOGO SECTION */}
          <Typography 
            variant="h5" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              fontWeight: '900', 
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          >
            <span style={{ color: 'white', letterSpacing: '2px', fontFamily: 'Oswald' }}>CINEMA</span>
            <span style={{ 
              backgroundColor: '#F5C518', 
              color: 'black', 
              padding: '2px 10px', 
              borderRadius: '6px', 
              marginLeft: '8px',
              fontFamily: 'Oswald',
              boxShadow: '0 0 15px rgba(245, 197, 24, 0.4)'
            }}>HUB</span>
          </Typography>

          {/* NAVIGATION SECTION */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button component={Link} to="/" sx={navButtonStyle('/')}>
              HOME
            </Button>

            {user ? (
              <Box sx={{ 
                ml: 3, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                padding: '4px 12px',
                borderRadius: '30px',
                bgcolor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Avatar sx={{ 
                  bgcolor: '#F5C518', 
                  color: 'black', 
                  width: 34, 
                  height: 34, 
                  fontSize: '1rem', 
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px rgba(245, 197, 24, 0.3)'
                }}>
                  {user.email ? user.email[0].toUpperCase() : 'U'}
                </Avatar>
                
                <Tooltip title="Logout">
                  <IconButton 
                    onClick={handleLogout} 
                    sx={{ 
                      color: '#ff4d4d', 
                      transition: 'all 0.3s',
                      '&:hover': { 
                        bgcolor: 'rgba(255, 77, 77, 0.1)',
                        transform: 'rotate(90deg)' 
                      } 
                    }}
                  >
                    <LogoutIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="contained" 
                sx={{ 
                  ml: 2,
                  px: 3,
                  borderRadius: '8px',
                  bgcolor: '#F5C518', 
                  color: 'black', 
                  fontWeight: '800',
                  boxShadow: '0 4px 14px rgba(245, 197, 24, 0.39)',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    bgcolor: '#e2b616',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(245, 197, 24, 0.5)'
                  }
                }}
              >
                LOGIN
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;