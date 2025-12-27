import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Paper, AppBar, Toolbar, Grid
} from '@mui/material';
import { AuthContext } from '../App';

function AddMovie() {
  const contextValues = useContext(AuthContext);
  const user = contextValues?.user;
  const allMovies = contextValues?.allMovies || [];
  const setAllMovies = contextValues?.setAllMovies;

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.movie;

  const [movie, setMovie] = useState({
    title: '', rating: '', year: '', imageUrl: '', description: '', genre: 'Action'
  });

  useEffect(() => {
    if (user === null || user.role !== 'admin') {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (editData) {
      setMovie({
        id: editData.id,
        title: editData.title || '',
        rating: editData.rating || '',
        year: editData.year || '',
        imageUrl: editData.poster || editData.imageUrl || '',
        description: editData.description || '',
        genre: Array.isArray(editData.genre) ? editData.genre[0] : (editData.genre || 'Action')
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      const updatedList = allMovies.map(m => 
        m.id === editData.id ? { ...movie, id: editData.id, poster: movie.imageUrl, rating: parseFloat(movie.rating) } : m
      );
      setAllMovies(updatedList);
    } else {
      const newMovie = { ...movie, id: Date.now(), poster: movie.imageUrl, rating: parseFloat(movie.rating) };
      setAllMovies([newMovie, ...allMovies]);
    }
    navigate('/admin/dashboard');
  };

  // 🎨 Custom Style for TextFields
  const textFieldStyle = {
    mb: 2,
    bgcolor: '#252525', // Dark Grey background
    borderRadius: 1,
    '& .MuiInputBase-input': { color: 'white' }, // Text color
    '& .MuiInputLabel-root': { color: '#aaa' }, // Label color
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#444' }, // Border color
      '&:hover fieldset': { borderColor: '#F5C518' }, // Hover border
      '&.Mui-focused fieldset': { borderColor: '#F5C518' }, // Focus border
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', pb: 5 }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: '#1A1A1A', borderBottom: '1px solid #333' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          
          <Box>
            <Button sx={{ color: 'white' }} onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>
            <Button sx={{ color: 'white' }} onClick={() => navigate('/')}>View Site</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={10} sx={{ 
          p: 5, 
          bgcolor: '#1A1A1A', 
          color: 'white', 
          borderRadius: 3, 
          border: '1px solid #333',
          boxShadow: '0 0 20px rgba(0,0,0,0.8)' 
        }}>
          <Typography variant="h4" sx={{ color: '#F5C518', mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
            {editData ? 'EDIT MOVIE' : 'ADD NEW MOVIE'}
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Movie Title" name="title" required
              value={movie.title} onChange={handleChange}
              sx={textFieldStyle} InputLabelProps={{ shrink: true }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="IMDb Rating" name="rating" type="number" required
                  inputProps={{ step: "0.1", min: "0", max: "10" }}
                  value={movie.rating} onChange={handleChange}
                  sx={textFieldStyle} InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Release Year" name="year" type="number" required
                  value={movie.year} onChange={handleChange}
                  sx={textFieldStyle} InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth label="Poster Image URL" name="imageUrl" required
              value={movie.imageUrl} onChange={handleChange}
              sx={textFieldStyle} InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth multiline rows={4} label="Movie Description" name="description"
              value={movie.description} onChange={handleChange}
              sx={textFieldStyle} InputLabelProps={{ shrink: true }}
            />

            <Button
              type="submit" fullWidth variant="contained"
              sx={{ 
                mt: 2, bgcolor: '#F5C518', color: 'black', fontWeight: 'bold', 
                py: 1.5, fontSize: '1.1rem',
                '&:hover': { bgcolor: '#e2b616', transform: 'translateY(-2px)' },
                transition: 'all 0.2s'
              }}
            >
              {editData ? 'CONFIRM UPDATE' : 'SAVE TO DATABASE'}
            </Button>
            
            <Button 
              fullWidth onClick={() => navigate('/admin/dashboard')}
              sx={{ mt: 2, color: '#888', '&:hover': { color: 'white' } }}
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddMovie;