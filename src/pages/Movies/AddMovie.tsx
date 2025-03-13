import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieFormData } from '../../components/MovieForm/MovieForm.types';
import MovieForm from '../../components/MovieForm/MovieForm';
import { addMovie } from '../../api/movies.api';

const AddMovie = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || '';
  const token = localStorage.getItem('token') || '';

  const handleAddMovie = async (data: MovieFormData) => {
    const fileList = data.posterFile as FileList;
    const posterFile = fileList?.[0];

    if (!posterFile) {
      alert('Poster file is missing');
      return;
    }

    const response = await addMovie(
      {
        title: data.title,
        publishingYear: data.publishingYear,
        posterFile: posterFile,
      },
      userId,
      token
    );

    if (response.success) {
      alert('Movie created successfully!');
      navigate('/movieList');
    } else {
      alert(response.error || 'Failed to create movie.');
    }
  };

  return (
    <div className="movie-create-wrapper">
      <h1>Create a New Movie</h1>
      <MovieForm mode="add" onSubmit={handleAddMovie} />
    </div>
  );
};

export default AddMovie;
