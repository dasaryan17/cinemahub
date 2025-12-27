import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Stack,
  Typography
} from '@mui/material';

function AddMoviePage() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: '',
    rating: '',
    year: '',
    poster: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const movies = JSON.parse(localStorage.getItem('cinema_movies') || '[]');

    const newMovie = {
      ...movie,
      id: Date.now(),
      rating: Number(movie.rating),
      year: Number(movie.year)
    };

    localStorage.setItem(
      'cinema_movies',
      JSON.stringify([...movies, newMovie])
    );

    alert('Movie added successfully!');
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background:
          'radial-gradient(circle at top, #1a1a2e 0%, #08080a 70%)'
      }}
    >
      <Container maxWidth="xs">
        <Paper
          sx={{
            p: 4,
            bgcolor: 'rgba(22,22,22,0.9)',
            borderRadius: 4,
            border: '1px solid rgba(245,197,24,0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: 'center',
              color: '#F5C518',
              fontWeight: 800,
              letterSpacing: 1
            }}
          >
            Add Movie
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {[
                { label: 'Title', key: 'title' },
                { label: 'Rating', key: 'rating', type: 'number' },
                { label: 'Year', key: 'year', type: 'number' },
                { label: 'Poster URL', key: 'poster' }
              ].map((field) => (
                <TextField
                  key={field.key}
                  label={field.label}
                  type={field.type || 'text'}
                  variant="filled"
                  required
                  value={movie[field.key]}
                  onChange={(e) =>
                    setMovie({ ...movie, [field.key]: e.target.value })
                  }
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.06)',
                    borderRadius: 2,
                    input: { color: 'white' },
                    label: { color: 'grey' },
                    '& .MuiFilledInput-underline:before': { display: 'none' },
                    '& .MuiFilledInput-underline:after': { display: 'none' },
                    '& label.Mui-focused': { color: '#F5C518' }
                  }}
                />
              ))}

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 1,
                  bgcolor: '#F5C518',
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: 30,
                  py: 1.2,
                  transition: '0.3s',
                  '&:hover': {
                    bgcolor: '#e2b616',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Add Movie
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddMoviePage;
