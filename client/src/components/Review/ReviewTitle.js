import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'

const ReviewTitle = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    <InputLabel htmlFor="review-title">Title your Review</InputLabel>
    <FormControl fullWidth>
    <TextField 
    id = "review-title"
    value = {props.enteredTitle}
    onChange = {props.onTitleChange}
    >
    </TextField>
    </FormControl>
  </>
  );
}

export default ReviewTitle;
