import * as React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
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
      <Grid container spacing={2} sx={{ padding: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4">Search Movies</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="search-actor"
            label="Actor Name"
            fullWidth
            value={actor}
            onChange={(e) => setActor(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="search-director"
            label="Director Name"
            fullWidth
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="search-title"
            label="Movie Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            id="search-button"
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Find Movies
          </Button>
        </Grid>

        <Grid item xs={12}>
          {results.map((movie, idx) => (
            <div key={idx} style={{ marginBottom: '2rem' }}>
              <Typography><strong>Movie Title:</strong> {movie.title}</Typography>
              <Typography><strong>Movie Director:</strong> {movie.directors}</Typography>
              <Typography><strong>Average Rating:</strong> {movie.avg_rating || 'N/A'}</Typography>
              {movie.reviews && (
                <>
                  <Typography><strong>Reviews:</strong></Typography>
                  <Typography sx={{ whiteSpace: 'pre-line' }}>
                    {movie.reviews}
                  </Typography>
                </>
              )}

            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
