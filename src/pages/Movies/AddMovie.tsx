import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieFormData } from '../../components/MovieForm/MovieForm.types';
import MovieForm from '../../components/MovieForm/MovieForm';
import { addMovie } from '../../api/movies.api';
import { t } from "../../i18n";
import './MoviePage.css';

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
        publishYear: data.publishYear,
        posterFile: posterFile,
      },
      userId,
      token
    );

    if (response.success) {
     
alert(t('api.movieAddSuccess'));
      navigate('/movieList');
    } else {
      alert(response.error ||t('api.movieAddFailed'));
    }
  };

  return (
    <div className="movie-wrapper">
      <h1>{t("movies.add")}</h1>
      <MovieForm mode="add" onSubmit={handleAddMovie} />
    </div>
  );
};

export default AddMovie;
