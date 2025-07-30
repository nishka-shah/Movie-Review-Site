import { TextField, Box } from '@mui/material';

const ReviewBody = (props) => {
  return (
    <Box>
      <TextField
        id="review-body"
        label="Enter your Review"
        multiline
        fullWidth
        minRows={3}
        maxRows={10}
        value={props.enteredReview}
        onChange={props.onReviewChange}
        inputProps={{ maxLength: 200 }}
        sx={{
          color: 'white',
          input: { color: 'white' },
          textarea: { color: 'white' },
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 1,
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.2)',
            },
            '&:hover fieldset': {
              borderColor: '',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e50914',
            },
          },
        }}
      />
    </Box>
  );
};

export default ReviewBody;
