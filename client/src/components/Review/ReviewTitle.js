import { TextField, Box } from '@mui/material';

const ReviewTitle = (props) => {
  return (
    <Box>
      <TextField
        id="review-title"
        label="Title your Review"
        fullWidth
        value={props.enteredTitle}
        onChange={props.onTitleChange}
        sx={{
          input: { color: 'white' },
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 1,
          color: 'white',
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

export default ReviewTitle;
