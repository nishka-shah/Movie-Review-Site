import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MyAppbar from '../App/MyAppbar';

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
        setSubmittedReview({
          selectedMovie,
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
    <Grid container spacing={3} sx={{ padding: 4 }}>
      {/* Header */}
      <Grid item xs={12}>
        <Typography variant="h3">Review a movie</Typography>
      </Grid>

      {/* Movie Selection */}
      <Grid item xs={12}>
        <MovieSelection
          movies={movies}
          selectedMovie={selectedMovie}
          onMovieChange={(e) => setSelectedMovie(e.target.value)}
        />
        {errors.movie && (
          <Typography color="red" sx={{ mt: 1 }}>
            {errors.movie}
          </Typography>
        )}
      </Grid>

      {/* Review Title */}
      <Grid item xs={12}>
        <ReviewTitle
          enteredTitle={enteredTitle}
          onTitleChange={(e) => setEnteredTitle(e.target.value)}
        />
        {errors.title && (
          <Typography color="red" sx={{ mt: 1 }}>
            {errors.title}
          </Typography>
        )}
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

      {/* Submit Button */}
      <Grid item xs={12}>
        <Button
          id="submit-button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>

      {/* Confirmation */}
      {showConfirmation && (
        <>
          <Grid item xs={12} id="confirmation-message">
            <Typography variant="h6" sx={{ mt: 2 }}>
              Your review has been received
            </Typography>
            <Typography>Movie: {submittedReview.selectedMovie}</Typography>
            <Typography>Review Title: {submittedReview.enteredTitle}</Typography>
            <Typography>Review Body: {submittedReview.enteredReview}</Typography>
            <Typography>Rating: {submittedReview.selectedRating}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  </>
);

};
export default Review;
