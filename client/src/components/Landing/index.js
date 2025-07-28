import * as React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImg from '../assets/cinema.jpg';
import MyAppbar from '../App/MyAppbar';

const Landing = () => {
  const [topMovies, setTopMovies] = React.useState([]);
  const [totalReviews, setTotalReviews] = React.useState(0);

  React.useEffect(() => {
    // Get top 5 movies from backend
    fetch('/api/top-movies')
      .then(res => res.json())
      .then(data => setTopMovies(data))
      .catch(err => console.error('Top movies fetch failed:', err));

    // Get total reviews from backend
    fetch('/api/review-count')
      .then(res => res.json())
      .then(data => setTotalReviews(data.count))
      .catch(err => console.error('Review count fetch failed:', err));
  }, []);

  return (
    <>
    <MyAppbar />
    <Box
      sx={{
        backgroundImage: `url(${backgroundImg})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 4,
        color: 'white',
      }}
    >
      {/* App title and tagline */}
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Popcorn & Opinions
      </Typography>
      <Typography variant="h6" gutterBottom>
        May the reviews be ever in your favour.
      </Typography>

      {/* Buttons */}
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/search"
            id="nav-search" 
          >
            Search Movies
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/review"
            id="nav-review" 
          >
            Write a Review
          </Button>
        </Grid>
      </Grid>

      {/* Stats */}
      <Typography variant="subtitle1" sx={{ mt: 4 }}>
        🧮 Total Reviews Submitted: <strong>{totalReviews}</strong>
      </Typography>

      {/* Top 5 Movies */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        ⭐ Top 5 Rated Movies
      </Typography>

      <Grid container spacing={2}>
        {topMovies.map((movie, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Paper sx={{ padding: 2, backgroundColor: 'rgba(0,0,0,0.7)' }}>
              <Typography variant="h6">{movie.title}</Typography>
              <Typography>Average Rating: {movie.avg_rating}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default Landing;
