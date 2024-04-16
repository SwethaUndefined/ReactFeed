import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './themeContext'; 

const FeedPage = lazy(() => import("./Pages/feedPage"));
const PostDetailPage = lazy(() => import("./Pages/postDetailPage"));

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><FeedPage /></Suspense>} />
          <Route path="/postDetailPage/:postId" element={<Suspense fallback={<div>Loading...</div>}><PostDetailPage /></Suspense>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
