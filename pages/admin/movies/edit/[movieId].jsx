import FormField from '@components/common/FormField';
import { Button } from '@components/ui';
import { useUI } from '@components/ui/uiContext';
import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Chip, InputAdornment, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { uploadImage } from 'utils/imageUploader';
import { MovieSchema } from 'utils/validationSchema';

const EditMovie = ({ movie }) => {
  // console.log(movie);
  const { loginState } = useAuthContext();
  const { dispatch } = useUI();
  const router = useRouter();
  
  const {
    _id,
    overview,
    release_date,
    runtime,
    tagline,
    title,
    status,
    genres: dbGenres,
    poster: dbPoster,
  } = movie;
  const [poster, setPoster] = useState(dbPoster);
  const [genreInput, setGenreInput] = useState('');
  const [genres, setGenres] = useState(dbGenres);
  
  useEffect(() => {
    if (!loginState.user) router.replace('/');
  });

  const statuses = [
    'Rumored',
    'Planned',
    'In Production',
    'Post Production',
    'Released',
    'Canceled',
  ];

  const addGenre = () => {
    if (!genreInput) return;
    setGenres((prev) => [...prev, genreInput]);
    setGenreInput('');
  };
  const deleteGenre = (chipToDelete) => () => {
    setGenres((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const initialValues = {
    overview,
    release_date,
    runtime,
    tagline,
    title,
    status,
  };

  const selectPoster = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const url = reader.result.toString();
      setPoster(url);
    };
  };

  const editMovie = (values, { resetForm }) => {
    uploadImage(poster)
      .then(({ public_id, secure_url }) => {
        const movie = { ...values, poster: secure_url, public_id, genres };
        return axios.patch(`/api/movies/${_id}`, movie, {
          headers: { Authorization: `Bearer ${loginState.token}` },
        });
      })
      .then(() => {
        dispatch({ type: 'OPEN_TOAST', text: 'Movie updated successfully!' });
        resetForm();
        setPoster('');
        setGenres([]);
        router.back();
      })
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      });
  };

  return (
    <div className="my-8">
      <Formik
        initialValues={initialValues}
        validationSchema={MovieSchema}
        validateOnMount
        onSubmit={editMovie}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="mx-auto flex w-80 flex-col gap-5">
            <FormField type="text" name="title" label="Title" />
            <FormField type="text" name="tagline" label="Tagline" />
            <FormField type="text" name="overview" label="Overview" />
            <FormField type="number" name="runtime" label="Runtime" />
            <FormField
              type="date"
              name="release_date"
              label="Release date"
              InputLabelProps={{ shrink: true }}
            />
            {genres && genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, i) => {
                  return (
                    <div key={i}>
                      <Chip label={genre} onDelete={deleteGenre(genre)} />
                    </div>
                  );
                })}
              </div>
            )}
            <FormField
              type="text"
              name="genres"
              label="Genres"
              onChange={(e) => setGenreInput(e.target.value)}
              value={genreInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Chip size="small" label="Add" onClick={addGenre} />
                  </InputAdornment>
                ),
              }}
            />
            <Field
              as={TextField}
              select
              label="Status"
              name="status"
              size="small"
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Field>
            {!poster ? (
              <label htmlFor="poster" className="cursor-pointer text-center">
                <AddPhotoAlternate className="text-9xl text-neutral-500" />
                <FormField
                  type="file"
                  id="poster"
                  name="poster"
                  onChange={selectPoster}
                  hidden
                />
              </label>
            ) : (
              <div className="relative">
                <Image src={poster} alt="" height={500} width={500} />
                <div
                  className="absolute right-0 top-0 cursor-pointer rounded-full border bg-white"
                  onClick={() => setPoster('')}
                >
                  <Close />
                </div>
              </div>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !genres.length || !poster}
              loading={isSubmitting}
            >
              {`${isSubmitting ? 'Updating Movie...' : 'Update Movie'}`}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditMovie;

export const getServerSideProps = ({ params }) => {
  const { movieId } = params;
  return fetch(`http://localhost:3000/api/movies/${movieId}`)
    .then((res) => res.json())
    .then((data) => {
      return { props: { movie: data } };
    });
};
