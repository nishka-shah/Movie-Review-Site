import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const ReviewBody = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
      <InputLabel htmlFor="review-body">Enter your Review</InputLabel>
      <TextField 
        id="review-body"
        multiline
        fullWidth
        minRows={1}              
        maxRows={10}          
        value={props.enteredReview}
        onChange={props.onReviewChange}
        inputProps={{ maxLength: 200 }}
      />
    </>
  );
}
export default ReviewBody;