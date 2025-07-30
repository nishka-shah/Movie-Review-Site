import {
  TextField,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

const MovieSelection = (props) => {
  return (
    <Box>
      <TextField
        id="movie-select"
        label="Select a Movie"
        select
        fullWidth
        value={props.selectedMovie}
        onChange={props.onMovieChange}
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
          '& .MuiSvgIcon-root': {
            color: 'white', // dropdown arrow
          },
        }}
      >
        {props.movies.map((movie) => (
          <MenuItem key={movie.id} value={movie.id}>
            {movie.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default MovieSelection;
