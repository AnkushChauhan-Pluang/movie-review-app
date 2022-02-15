import MovieList from '@components/movie/MovieList';
import { tmdb } from 'config';
import Head from 'next/head';

const Home = ({ data }) => {
  if (!data.success)
    return (
      <div className="m-2 border-l-8 border-red-600 px-2">
        {data.status_message}
      </div>
    );

  const { results: movies } = data;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Movie Review App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await fetch(
    `${tmdb.discoverMoviesBaseUrl}?&api_key=${process.env.TMDB_API_KEY}`
  );
  const data = await res.json();
  return { props: { data } };
};
