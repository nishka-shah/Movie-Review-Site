import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import MyPage from '../MyPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1f1f1f',
    },
    secondary: {
      main: '#e50914',
    },
    background: {
      default: '#000000',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/MyPage" element={<MyPage />} />
          </Routes>
      </Router>
    </ThemeProvider>
    );
  }

export default App;
