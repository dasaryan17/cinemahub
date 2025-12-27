import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Typography, Paper, FormControl, 
  InputLabel, Select, MenuItem, Chip, Stack, 
  CircularProgress, Alert, Grid // <-- Yahan 'Grid' add karein
} from '@mui/material';
const allGenres = ["Action", "Biography", "Comedy", "Crime", "Drama", "History", "Sci-Fi", "Western"];

const MovieForm = ({ initialData = null, formTitle, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    poster: '',
    rating: '',
    year: '',
    duration: '',
    genre: []
  });
  const [selectedGenre, setSelectedGenre] = useState('');

  // Edit mode ke liye initial data load karna
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreAdd = () => {
    if (selectedGenre && !formData.genre.includes(selectedGenre)) {
      setFormData(prev => ({ ...prev, genre: [...prev.genre, selectedGenre] }));
      setSelectedGenre(''); // Reset select after adding
    }
  };

  const handleGenreDelete = (genreToDelete) => () => {
    setFormData(prev => ({ ...prev, genre: prev.genre.filter(g => g !== genreToDelete) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)', bgcolor: '#0a0a0b', p: 4 }}>
      <Paper sx={{ p: 4, bgcolor: '#1A1A1A', color: 'white', width: '100%', maxWidth: 600, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#f5c518', mb: 3 }}>
          {formTitle}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField fullWidth label="Movie Title" name="title" value={formData.title} onChange={handleChange} variant="filled" required sx={{ bgcolor: '#2C2C2C', borderRadius: 1 }} InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#aaa' } }} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} variant="filled" multiline rows={4} sx={{ bgcolor: '#2C2C2C', borderRadius: 1 }} InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#aaa' } }} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Poster URL" name="poster" value={formData.poster} onChange={handleChange} variant="filled" required sx={{ bgcolor: '#2C2C2C', borderRadius: 1 }} InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#aaa' } }} />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Rating (0.0 - 10.0)" name="rating" type="number" value={formData.rating} onChange={handleChange} variant="filled" sx={{ bgcolor: '#2C2C2C', borderRadius: 1 }} InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#aaa' } }} inputProps={{ step: 0.1, min: 0, max: 10 }} />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Release Year" name="year" type="number" value={formData.year} onChange={handleChange} variant="filled" sx={{ bgcolor: '#2C2C2C', borderRadius: 1 }} InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#aaa' } }} />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Duration (min)" name="duration" type="number" value={formData.duration} onChange={handleChange} variant="filled" sx={{ bgcolor: '#2C2C2C', borderRadius: 1 }} InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#aaa' } }} />
            </Grid>

            {/* Genre Selector */}
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl fullWidth variant="filled" sx={{ bgcolor: '#2C2C2C', borderRadius: 1 }}>
                  <InputLabel sx={{ color: '#aaa' }}>Add Genre</InputLabel>
                  <Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} sx={{ color: 'white' }}>
                    {allGenres.map((genre) => (
                      <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button onClick={handleGenreAdd} variant="contained" sx={{ bgcolor: '#f5c518', color: 'black', '&:hover': { bgcolor: '#e2b616' } }}>+</Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                {formData.genre.map((genre) => (
                  <Chip key={genre} label={genre} onDelete={handleGenreDelete(genre)} sx={{ bgcolor: '#f5c518', color: 'black', fontWeight: 'bold' }} />
                ))}
              </Stack>
            </Grid>

          </Grid>
          
          <Button 
            type="submit" fullWidth variant="contained" 
            sx={{ bgcolor: '#f5c518', color: 'black', fontWeight: 'bold', py: 1.5, mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : formTitle}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default MovieForm;
