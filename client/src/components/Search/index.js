import * as React from 'react';
import { Paper, Button, Grid, Box, TextField, Typography } from '@mui/material';
import MyAppbar from '../App/MyAppbar';


const Search = () => {
  const [actor, setActor] = React.useState('');
  const [director, setDirector] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [results, setResults] = React.useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actor, director, title }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      // Defensive check to avoid crashing
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };


  return (
    <>
      <MyAppbar />

      <Paper
        elevation={4}
        sx={{
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 3,
          maxWidth: 1000,
          mx: 'auto',
          mt: 4,
        }}
      >
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Search Movies
            </Typography>
            <Typography variant="subtitle1">
              Find movies by actor, director, or title.
            </Typography>
          </Grid>

          {/* Inputs */}
          <Grid item xs={12} sm={4}>
            <TextField
              id="search-actor"
              label="Actor Name"
              fullWidth
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              sx={{
                input: { color: 'white' },
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 1,
              }}
            />

          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="search-director"
              label="Director Name"
              fullWidth
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              sx={{
                input: { color: 'white' },
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 1,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="search-title"
              label="Movie Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                input: { color: 'white' },
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 1,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(to right, #e50914, transparent)',
                my: 2,
              }}
            />
          </Grid>
          {/* Search Button */}
          <Grid item xs={12}>
            <Button
              id="search-button"
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: '#e50914',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 8,
                px: 4,
                py: 1,
                '&:hover': {
                  backgroundColor: '#c21807',
                },
              }}
            >
              Find Movies
            </Button>
          </Grid>

          {/* Results */}
          <Grid item xs={12}>
            {results.map((movie, idx) => (
              <Paper
                key={idx}
                elevation={3}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  🎞️ {movie.title}
                </Typography>
                <Typography>
                  <strong>Director:</strong> {movie.directors}
                </Typography>
                <Typography>
                  <strong>Average Rating:</strong> {movie.avg_rating || 'N/A'}
                </Typography>

                {movie.reviews && (
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      <strong>Reviews:</strong>
                    </Typography>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                      {movie.reviews}
                    </Typography>
                  </Box>
                )}
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Search;
