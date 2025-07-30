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
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {/* Background Image */}
        <Box
          sx={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1,
          }}
        />

        {/* Foreground content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            padding: 4,
            color: 'white',
          }}
        >
          {/* App title and tagline */}
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
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
                sx={{
                  fontWeight: 600,
                  borderRadius: 8,
                  color: 'white',
                  backgroundColor: '#e50914', // Netflix red or any red you like
                  '&:hover': {
                    backgroundColor: '#c21807', // Slightly darker red on hover
                  },
                }}
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
                sx={{
                  fontWeight: 600,
                  borderRadius: 8,
                  color: 'white',
                  backgroundColor: '#e50914', // Netflix red or any red you like
                  '&:hover': {
                    backgroundColor: '#c21807', // Slightly darker red on hover
                  },
                }}
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
            <Typography variant="subtitle1">
              Total Reviews Submitted: <strong style={{ fontSize: '1.2rem' }}>{totalReviews}</strong>
            </Typography>
          


          {/* Top 5 Movies */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            ⭐ Top 5 Movies
          </Typography>

          <Grid container spacing={2}>
            {topMovies.map((movie, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    padding: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 0 10px #e50914',
                      color: 'white',
                      borderRadius: 2,
                    },
                  }}
                    >
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography>Average Rating: {movie.avg_rating}</Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box >
    </>
  )
};


export default Landing;
