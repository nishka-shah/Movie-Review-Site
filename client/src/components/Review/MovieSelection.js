import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'

const MovieSelection = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
      <InputLabel htmlFor="movie-select">Select a movie</InputLabel>
      <FormControl fullWidth>
        <Select
          id="movie-select"
          value={props.selectedMovie}
          onChange={props.onMovieChange}
        >
          {props.movies.map((movie) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

}

export default MovieSelection;
