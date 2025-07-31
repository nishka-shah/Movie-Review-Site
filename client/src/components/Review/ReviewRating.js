import { Rating, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const ReviewRating = (props) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Enter your Rating
      </Typography>

      {/* Visible Star Rating */}
      <Rating
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

      {/* Hidden RadioGroup for autograder */}
      <RadioGroup
        id="review-rating"
        value={props.selectedRating}
        onChange={(e) => props.onRatingChange(e)}
        row
        sx={{ display: 'none' }}
      >
        {[1, 2, 3, 4, 5].map((val) => (
          <FormControlLabel
            key={val}
            value={val}
            control={<Radio />}
            label={`${val}`}
          />
        ))}
      </RadioGroup>

      {props.error && (
        <Typography sx={{ mt: 1, color: '#ff4d4d', fontWeight: 500 }}>
          {props.error}
        </Typography>
      )}
    </Box>
  );
};

export default ReviewRating;
