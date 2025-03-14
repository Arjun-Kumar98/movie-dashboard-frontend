import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieFormData } from '../../components/MovieForm/MovieForm.types';
import MovieForm from '../../components/MovieForm/MovieForm';
import {getMovieById } from '../../api/movies.api';
import { updateMovie } from '../../api/movies.api';
import { t } from "../../i18n";
import './MoviePage.css'

const MovieEdit = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || '';
  const token = localStorage.getItem('token') || '';
  const [initialValues, setInitialValues] = useState<MovieFormData & { posterUrl?: string } | null>(null);
  useEffect(() => {
    const fetchMovie = async () => {
      if (!token || !movieId) return;
      const result = await getMovieById(movieId, token);
      if (result.success && result.data) {
        setInitialValues({
          title: result.data.title,
          publishYear: result.data.publishYear,
          posterUrl: result.data.posterUrl,
          posterFile: null,
        });
      } else {
        // optional: show error or redirect
        navigate('/movieList');
      }
    };
  
    fetchMovie();
  }, [movieId, token]);
  

  const handleUpdateMovie = async (formData: MovieFormData) => {
    const fileList = formData.posterFile as FileList;
    const posterFile = fileList?.[0] || null;

    const result = await updateMovie(
      Number(movieId),
      {
        title: formData.title,
        publishYear: formData.publishYear,
        posterFile,
      },
      userId,
      token
    );

    if (result.success) {
    
alert(t('api.movieUpdateSuccess'));
      navigate('/movieList');
    } else {
      alert(result.error || t('api.movieUpdateFailed'));
    }
  };

  return (
    <div className="movie-wrapper">
      <h1>{t("movies.edit")}</h1>
      {initialValues ? (
        <MovieForm
          mode="edit"
          initialValues={initialValues}
          onSubmit={handleUpdateMovie}
        />
      ) : (
        <p>Loading movie...</p>
      )}
    </div>
  );
};

export default MovieEdit;
