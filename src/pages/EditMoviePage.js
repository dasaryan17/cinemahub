import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, TextField, Button, Typography, Container, 
  Paper, Stack, CircularProgress 
} from '@mui/material';

function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // 1. Local storage se data fetch karna
    const movies = JSON.parse(localStorage.getItem('cinema_movies')) || [];
    const found = movies.find(m => String(m.id) === String(id));
    
    if (found) {
      setMovie({
        ...found,
        // Genre array ko comma separated string banana input display ke liye
        genre: Array.isArray(found.genre) ? found.genre.join(', ') : found.genre
      });
    }
  }, [id]);

  const handleChange = (key, value) => {
    setMovie(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const movies = JSON.parse(localStorage.getItem('cinema_movies')) || [];

    const updatedMovies = movies.map(m =>
      String(m.id) === String(id)
        ? {
            ...movie,
            rating: Number(movie.rating),
            year: Number(movie.year),
            duration: Number(movie.duration),
            // Wapas array mein convert karna taaki database format sahi rahe
            genre: typeof movie.genre === 'string' 
                   ? movie.genre.split(',').map(g => g.trim()) 
                   : movie.genre
          }
        : m
    );

    localStorage.setItem('cinema_movies', JSON.stringify(updatedMovies));
    alert('Movie updated successfully! ✅');
    navigate('/');
  };

  if (!movie) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: '#F5C518' }} />
      </Box>
    );
  }

  // --- Premium UI Styling ---
  const inputStyle = {
    bgcolor: 'rgba(255,255,255,0.06)', 
    borderRadius: 2,
    input: { color: 'white' }, 
    label: { color: 'rgba(255,255,255,0.5)' },
    '& .MuiFilledInput-root': { 
        backgroundColor: 'transparent',
        '&:before, &:after': { display: 'none' } 
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#F5C518' },
    '& .MuiFilledInput-root.Mui-focused': { 
        borderBottom: '2px solid #F5C518',
        bgcolor: 'rgba(255,255,255,0.1)' 
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      py: 6, 
      background: 'radial-gradient(circle at top, #1a1a2e 0%, #08080a 100%)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ 
          p: { xs: 3, md: 5 }, 
          bgcolor: 'rgba(22,22,22,0.95)', 
          borderRadius: 4, 
          border: '1px solid rgba(245,197,24,0.2)',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#F5C518', fontWeight: 900, letterSpacing: 1 }}>
            EDIT MOVIE
          </Typography>

          <Stack spacing={2.5}>
            <TextField label="Movie Title" variant="filled" fullWidth value={movie.title} onChange={e => handleChange('title', e.target.value)} sx={inputStyle} />
            
            <Stack direction="row" spacing={2}>
                <TextField label="Rating (IMDb)" type="number" variant="filled" fullWidth value={movie.rating} onChange={e => handleChange('rating', e.target.value)} sx={inputStyle} />
                <TextField label="Year" type="number" variant="filled" fullWidth value={movie.year} onChange={e => handleChange('year', e.target.value)} sx={inputStyle} />
            </Stack>

            <TextField label="Duration (minutes)" type="number" variant="filled" fullWidth value={movie.duration} onChange={e => handleChange('duration', e.target.value)} sx={inputStyle} />
            
            <TextField label="Genres (e.g. Action, Drama)" variant="filled" fullWidth value={movie.genre} onChange={e => handleChange('genre', e.target.value)} sx={inputStyle} />
            
            <TextField label="Description" multiline rows={3} variant="filled" fullWidth value={movie.description} onChange={e => handleChange('description', e.target.value)} sx={inputStyle} />
            
            <TextField label="Poster Image URL" variant="filled" fullWidth value={movie.poster} onChange={e => handleChange('poster', e.target.value)} sx={inputStyle} />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button 
                fullWidth 
                variant="contained"
                onClick={handleSave} 
                sx={{ 
                    bgcolor: '#F5C518', 
                    color: 'black', 
                    fontWeight: 'bold', 
                    borderRadius: 2, 
                    py: 1.5,
                    '&:hover': { bgcolor: '#e2b616', transform: 'translateY(-2px)' },
                    transition: 'all 0.2s'
                }}
              >
                Update Movie
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                onClick={() => navigate('/')} 
                sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.3)', 
                    borderRadius: 2,
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditMoviePage;