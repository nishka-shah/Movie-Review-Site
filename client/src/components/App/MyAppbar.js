import * as React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyAppbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button id="nav-landing" color="inherit" onClick={() => navigate('/')}>
          Landing
        </Button>
        <Button id="nav-search" color="inherit" onClick={() => navigate('/Search')}>
          Search
        </Button>
        <Button id="nav-review" color="inherit" onClick={() => navigate('/Review')}>
          Review
        </Button>
        <Button id="nav-myPage" color="inherit" onClick={() => navigate('/MyPage')}>
          MyPage
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppbar;

