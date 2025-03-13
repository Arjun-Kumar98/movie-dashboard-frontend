import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieFormData } from '../../components/MovieForm/MovieForm.types';
import MovieForm from '../../components/MovieForm/MovieForm';
import { updateMovie } from '../../api/movies.api';

const MovieEdit = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || '';
  const token = localStorage.getItem('token') || '';
  const [initialValues, setInitialValues] = useState<MovieFormData & { posterUrl?: string } | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/movies/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setInitialValues({
            title: data.title,
            publishingYear: data.publishingYear,
            posterFile: null,
            posterUrl: data.posterUrl,
          });
        } else {
          alert('Failed to fetch movie data');
          navigate('/movieList');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Error fetching movie');
        navigate('/movieList');
      }
    };

    fetchMovie();
  }, [movieId, navigate, token]);

  const handleUpdateMovie = async (formData: MovieFormData) => {
    const fileList = formData.posterFile as FileList;
    const posterFile = fileList?.[0] || null;

    const result = await updateMovie(
      Number(movieId),
      {
        title: formData.title,
        publishingYear: formData.publishingYear,
        posterFile,
      },
      userId,
      token
    );

    if (result.success) {
      alert('Movie updated successfully!');
      navigate('/movieList');
    } else {
      alert(result.error || 'Failed to update movie.');
    }
  };

  return (
    <div className="movie-edit-wrapper">
      <h1>Edit Movie</h1>
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
