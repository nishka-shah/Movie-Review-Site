import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MyAppbar from '../App/MyAppbar';
import { DialogTitle, Dialog, DialogActions, DialogContent} from '@mui/material';

const Review = () => {

  //states declarations
  //constants and functions declarations
  const [movies, setMovies] = React.useState([]);

  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');
  const [submittedReview, setSubmittedReview] = React.useState(null);

  const [errors, setErrors] = React.useState({});
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.error('Failed to fetch movies:', err);
      });
  }, []);

  // Error clearing effects
  React.useEffect(() => {
    if (selectedMovie && errors.movie) {
      const newErrors = { ...errors };
      delete newErrors.movie;
      setErrors(newErrors);
    }
  }, [selectedMovie, errors]);

  React.useEffect(() => {
    if (enteredTitle.trim() && errors.title) {
      const newErrors = { ...errors };
      delete newErrors.title;
      setErrors(newErrors);
    }
  }, [enteredTitle, errors]);

  React.useEffect(() => {
    if (enteredReview.trim() && errors.body) {
      const newErrors = { ...errors };
      delete newErrors.body;
      setErrors(newErrors);
    }
  }, [enteredReview, errors]);

  React.useEffect(() => {
    if (selectedRating && errors.rating) {
      const newErrors = { ...errors };
      delete newErrors.rating;
      setErrors(newErrors);
    }
  }, [selectedRating, errors]);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!selectedMovie) newErrors.movie = "Select your movie";
    if (!enteredTitle.trim()) newErrors.title = "Enter your review title";
    if (!enteredReview.trim()) newErrors.body = "Enter your review";
    if (!selectedRating) newErrors.rating = "Select the rating";
    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    if (isValid) {
      const reviewData = {
        movieID: parseInt(selectedMovie, 10),
        userID: 1,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: parseInt(selectedRating, 10)
      };

      console.log("Sending reviewData:", reviewData);

      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reviewData)
        });

        const result = await response.json();
        console.log("Server response:", result);

        if (response.ok) {
          const selectedMovieObj = movies.find((m) => m.id === parseInt(selectedMovie));
          setSubmittedReview({
            selectedMovie: selectedMovieObj?.name || 'Unknown Movie',
            enteredTitle,
            enteredReview,
            selectedRating
          });
          setShowConfirmation(true);
        } else {
          console.error("Failed to submit review");
          setShowConfirmation(false);
        }
      } catch (err) {
        console.error("Error submitting review:", err);
        setShowConfirmation(false);
      }
    } else {
      setShowConfirmation(false);
    }
  };


  return (
    <>
      <MyAppbar />
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 8 }, // horizontal padding (responsive)
          py: 6, // vertical padding
          pt: 1,
          pb: 6,
        }}
      >
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
                Write a Review
              </Typography>
              <Typography variant="subtitle1">
                Share your thoughts on your favorite (or not-so-favorite) films.
              </Typography>
            </Grid>


            {/* Movie Selection */}
            <Grid item xs={12}>
              <MovieSelection
                movies={movies}
                selectedMovie={selectedMovie}
                onMovieChange={(e) => setSelectedMovie(e.target.value)}
              />

              {errors.movie && (
                <Typography sx={{ mt: 1, color: '#ff4d4d', fontWeight: 500 }}>
                  {errors.movie}
                </Typography>
              )}

            </Grid>


            {/* Review Title */}
            <Grid item xs={12}>
              <Box>

                <ReviewTitle
                  enteredTitle={enteredTitle}
                  onTitleChange={(e) => setEnteredTitle(e.target.value)}
                />

                {errors.title && (
                  <Typography sx={{ mt: 1, color: '#ff4d4d', fontWeight: 500 }}>
                    {errors.title}
                  </Typography>
                )}
              </Box>
            </Grid>


            {/* Review Body */}
            <Grid item xs={12}>
              <ReviewBody
                enteredReview={enteredReview}
                onReviewChange={(e) => setEnteredReview(e.target.value)}
              />
              {errors.body && (
                <Typography color="red" sx={{ mt: 1 }}>
                  {errors.body}
                </Typography>
              )}
            </Grid>

            {/* Review Rating */}
            <Grid item xs={12}>
              <ReviewRating
                selectedRating={selectedRating}
                onRatingChange={(e) => setSelectedRating(e.target.value)}
              />
              {errors.rating && (
                <Typography color="red" sx={{ mt: 1 }}>
                  {errors.rating}
                </Typography>
              )}
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

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                id="submit-button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
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
                Submit
              </Button>
            </Grid>

            {/* Confirmation */}
            {showConfirmation && (
              <>
                <Dialog
                  open={showConfirmation}
                  onClose={() => setShowConfirmation(false)}
                  PaperProps={{
                    sx: {
                      backgroundColor: 'rgba(0,0,0,0.9)',
                      color: 'white',
                      borderRadius: 3,
                      px: 4,
                      py: 3,
                    },
                  }}
                >
                  <DialogTitle sx={{ fontWeight: 'bold' }}>Review Submitted</DialogTitle>
                  <DialogContent>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Movie:</strong> {submittedReview.selectedMovie}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Review Title:</strong> {submittedReview.enteredTitle}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Review Body:</strong> {submittedReview.enteredReview}
                    </Typography>
                    <Typography>
                      <strong>Rating:</strong> {submittedReview.selectedRating} 
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setShowConfirmation(false)}
                      sx={{
                        color: 'white',
                        backgroundColor: '#e50914',
                        fontWeight: 'bold',
                        px: 3,
                        borderRadius: 8,
                        '&:hover': { backgroundColor: '#c21807' },
                      }}
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

              </>
            )}
          </Grid>
        </Paper>
      </Box>
    </>
  );

};
export default Review;
