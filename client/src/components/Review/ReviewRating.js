import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';

const ReviewRating = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    <InputLabel htmlFor="review-rating">Enter your Rating</InputLabel>
    <RadioGroup
        id="review-rating"
        row
        value={props.selectedRating}
        onChange={props.onRatingChange}
      >
        <label>
          <Radio value="1" />
          1
        </label>
        <label>
          <Radio value="2" />
          2
        </label>
        <label>
          <Radio value="3" />
          3
        </label>
        <label>
          <Radio value="4" />
          4
        </label>
        <label>
          <Radio value="5" />
          5
        </label>
      </RadioGroup>
    </>
  );
}

export default ReviewRating;
