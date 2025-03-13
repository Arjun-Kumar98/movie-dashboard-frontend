import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { MovieFormData, MovieFormProps } from './MovieForm.types';
import { getMovieFormSchema } from './MovieForm.validation';
import InputField from '../common/InputField';
import Button from '../common/Button';

const MovieForm: React.FC<MovieFormProps> = ({
  mode,
  initialValues,
  onSubmit,
}) => {
  const schema = getMovieFormSchema(!!initialValues?.posterUrl, mode);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    formState: { errors },
  } = useForm<MovieFormData>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const navigate = useNavigate();
  const posterFile = watch('posterFile');
  const [isPosterRemoved, setIsPosterRemoved] = useState(false);

  const submitHandler = (data: MovieFormData) => {
    onSubmit(data);
  };

  const handleRemovePoster = () => {
    resetField('posterFile');
    setIsPosterRemoved(true);
  };

  const showPosterPreview =
    (posterFile?.length > 0 || (initialValues?.posterUrl && !isPosterRemoved));

  const posterPreviewSrc =
    posterFile?.length > 0
      ? URL.createObjectURL(posterFile[0])
      : initialValues?.posterUrl;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="movie-form">
      <h2>{mode === 'edit' ? 'Edit Movie' : 'Add Movie'}</h2>

      <InputField
        type="text"
        name="title"
        placeholder="Title"
        register={register}
        hasError={!!errors.title}
        errorMessage={errors.title?.message ?? ''}
      />

      <InputField
        type="number"
        name="publishingYear"
        placeholder="Publishing Year"
        register={register}
        hasError={!!errors.publishingYear}
        errorMessage={errors.publishingYear?.message ?? ''}
      />

      <div className="poster-upload">
        <label>Upload Poster</label>
        <input type="file" accept="image/*" {...register('posterFile')} />

        {errors.posterFile?.message && (
          <p className="input-error-text">
            {String(errors.posterFile.message)}
          </p>
        )}

        {showPosterPreview && posterPreviewSrc && (
          <div className="poster-preview-wrapper">
            <img
              src={posterPreviewSrc}
              alt="Poster Preview"
              className="poster-preview"
            />
            <button
              type="button"
              className="remove-poster-btn"
              onClick={handleRemovePoster}
            >
              ❌ Remove Poster
            </button>
          </div>
        )}
      </div>

      <div className="form-actions">
        <Button
          type="submit"
          label={mode === 'edit' ? 'Update Movie' : 'Add Movie'}
          className="submit-button"
        />
        <Button
          type="reset"
          label="Cancel"
          onClick={() => {
            if (mode === 'edit') {
              navigate('/movieList');
            } else {
              reset();
              setIsPosterRemoved(false);
            }
          }}
          className="cancel-button"
        />
      </div>
    </form>
  );
};

export default MovieForm;
