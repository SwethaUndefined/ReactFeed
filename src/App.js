// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedPage from "./Pages/feedPage"
import PostDetailPage from "./Pages/postDetailPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/post" element={<FeedPage />} />
        <Route path="/postDetailPage/:postId" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
