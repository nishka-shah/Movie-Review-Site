import * as React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyAppbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        paddingY: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold' }}
        >🍿 Popcorn & Opinions</Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" href="/">Landing</Button>
          <Button color="inherit" href="/search">Search</Button>
          <Button color="inherit" href="/review">Review</Button>
          <Button color="inherit" href="/mypage">MyPage</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppbar;

