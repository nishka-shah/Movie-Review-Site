import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import MyPage from '..MyPage';
import MyAppbar from './components/App/MyAppbar';



const App = () => {


  return (
    <Router>
      <MyAppbar />
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>
        <h1>MSE 245 - D3 template </h1>
        {/* Render <Review /> child component */}
    </Router>
  );
}

export default App;
