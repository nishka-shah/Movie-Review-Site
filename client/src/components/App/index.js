import * as React from 'react';


const App = () => {


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>
          <h1>MSE 245 - D3 template </h1>
        {/* Render <Review /> child component */}
      </div>
    </Router>

    </div>
  );
}

export default App;
