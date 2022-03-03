import SearchAppBar from '@components/common/SearchBar';
import MovieList from '@components/movie/MovieList';
import { Button } from '@mui/material';
import { useAuthContext } from 'contexts/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home = ({ serverMovies }) => {
  const { loginState } = useAuthContext();
  const router = useRouter();
  const [movies, setMovies] = useState(serverMovies);
  const [filterVal, setfilterVal] = useState(null);
  const [numMovies, setNumMovies] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  if (!serverMovies) return <div className="">Movies not found</div>;

  const filterMovies = () => {
    if (!filterVal) return;
    let moviesCopy = [...serverMovies];
    const filteredMovies = moviesCopy.filter((x) =>
      x.title.toLowerCase().includes(filterVal)
    );
    setNumMovies(filteredMovies.length);
    setMovies(filteredMovies);
  };

  const sortMovies = () => {
    let key = 'title';
    let sortedMovies = [...movies];
    sortedMovies.sort((a, b) => {
      return a[key].toLowerCase() > b[key].toLowerCase()
        ? isAscending
          ? 1
          : -1
        : a[key].toLowerCase() < b[key].toLowerCase()
        ? isAscending
          ? -1
          : 1
        : 0;
    });
    setIsAscending(!isAscending);
    setMovies(sortedMovies);
  };

  if (loginState.user && loginState.user.role === 'ADMIN')
    router.replace('/admin/dashboard');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Movie Review App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex gap-2">
        <SearchAppBar setFilterVal={setfilterVal} />
        <Button variant="contained" color="inherit" onClick={filterMovies}>
          Search
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => {
            setNumMovies(null);
            setMovies(serverMovies);
          }}
        >
          Clear Search
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => sortMovies()}
        >
          Sort movies
        </Button>
      </div>
      {numMovies && (
        <h3 className="mt-4 font-bold">({numMovies}) movies found</h3>
      )}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;

export const getServerSideProps = () => {
  return fetch('http://localhost:3000/api/movies')
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const serverMovies = data.data.movies;
      return { props: { serverMovies } };
    });
};
