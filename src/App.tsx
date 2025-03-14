import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import MovieList from './pages/Movies/MovieList';
import MovieCreate from './pages/Movies/AddMovie';
import MovieEdit from './pages/Movies/EditMovie';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/movieList" element={<MovieList />} />
        <Route path="/movie/add" element={<MovieCreate />} />
        <Route path="/movie/edit/:movieId" element={<MovieEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
