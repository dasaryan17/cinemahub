import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material'; // Grid ko yahan se hata diya
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    rating: '',
    poster: '',
  });

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const movieToEdit = savedMovies.find(m => m.id === parseInt(id));
    if (movieToEdit) {
      setMovie(movieToEdit);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const updatedMovies = savedMovies.map(m => 
      m.id === parseInt(id) ? { ...movie, id: parseInt(id) } : m
    );
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    alert("Movie Updated Successfully!");
    navigate('/admin/dashboard'); 
  };

  const fieldStyle = {
    input: { color: 'white' },
    label: { color: '#888' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#444' },
      '&:hover fieldset': { borderColor: '#F5C518' },
      '&.Mui-focused fieldset': { borderColor: '#F5C518' },
    },
    mb: 3
  };

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="sm">
        <Button 
          onClick={() => navigate(-1)} 
          startIcon={<ArrowBackIcon />}
          sx={{ color: '#F5C518', mb: 3 }}
        >
          BACK
        </Button>

        <Paper sx={{ p: 5, bgcolor: '#1A1A1A', color: 'white', borderRadius: 4, border: '1px solid #333' }}>
          <Typography variant="h4" sx={{ color: '#F5C518', fontWeight: '900', mb: 4, textAlign: 'center' }}>
            EDIT MOVIE
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth label="Movie Title" 
              value={movie.title}
              onChange={(e) => setMovie({...movie, title: e.target.value})}
              sx={fieldStyle} InputLabelProps={{ shrink: true }}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField 
                fullWidth label="Year" 
                value={movie.year}
                onChange={(e) => setMovie({...movie, year: e.target.value})}
                sx={fieldStyle} InputLabelProps={{ shrink: true }}
              />
              <TextField 
                fullWidth label="Rating" 
                value={movie.rating}
                onChange={(e) => setMovie({...movie, rating: e.target.value})}
                sx={fieldStyle} InputLabelProps={{ shrink: true }}
              />
            </Box>

            <TextField 
              fullWidth label="Poster URL" 
              value={movie.poster}
              onChange={(e) => setMovie({...movie, poster: e.target.value})}
              sx={fieldStyle} InputLabelProps={{ shrink: true }}
            />

            <Button type="submit" fullWidth variant="contained" 
              sx={{ mt: 2, py: 1.8, bgcolor: '#F5C518', color: 'black', fontWeight: 'bold' }}>
              SAVE CHANGES
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditMovie;