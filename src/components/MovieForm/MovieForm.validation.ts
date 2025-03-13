import * as Yup from 'yup';

export const getMovieFormSchema = (
  hasPosterUrl: boolean,
  mode: 'add' | 'edit'
) =>
  Yup.object().shape({
    title: Yup.string().required('Title is required'),
    publishingYear: Yup.number()
      .required('Publishing year is required')
      .min(1900, 'Year must be after 1900')
      .max(new Date().getFullYear(), 'Year cannot be after current year'),
    posterFile: Yup.mixed().test(
      'poster-required',
      'Poster image is required',
      function (value) {
        const fileList = value as FileList;

        if (mode === 'add') {
          return fileList && fileList.length > 0;
        }

        if (mode === 'edit') {
          return (fileList && fileList.length > 0) || hasPosterUrl;
        }

        return false;
      }
    ),
  });
