import { Rating, Typography, Box } from '@mui/material';

const ReviewRating = (props) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Enter your Rating
      </Typography>

      <Rating
        name="review-rating"
        value={Number(props.selectedRating)}
        onChange={(event, newValue) => {
          props.onRatingChange({ target: { value: newValue } });
        }}
        max={5}
        sx={{
          color: '#e50914',
          fontSize: '2rem', 
        }}
      />

      {props.error && (
        <Typography sx={{ mt: 1, color: '#ff4d4d', fontWeight: 500 }}>
          {props.error}
        </Typography>
      )}
    </Box>
  );
};

export default ReviewRating;
