import HoverRating from '@components/movie/Rating';
import ReviewList from '@components/movie/ReviewList';
import Tooltip from '@components/ui/Tooltip';
import { useUI } from '@components/ui/uiContext';
import { HeartIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import { toDDMMYYYY } from 'utils/dateFormatter';

const MovieDetails = ({ movie }) => {
  // console.log('movie => ', movie);
  const { loginState } = useAuthContext();
  const { dispatch } = useUI();
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchProfile = (url) => {
    return axios
      .get(url, {
        headers: { Authorization: `Bearer ${loginState.token}` },
      })
      .then(({ data }) => {
        const { favorites } = data;
        setIsFavorite(favorites.includes(_id));
      })
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      });
  };

  const { mutate } = useSWR(
    loginState.token ? '/api/users/me' : null,
    fetchProfile
  );

  const addRemoveFavorite = () => {
    if (!loginState.user) return;
    return axios
      .post(
        '/api/users/favorites',
        { movieId: _id },
        { headers: { Authorization: `Bearer ${loginState.token}` } }
      )
      .then(() => {
        dispatch({
          type: 'OPEN_TOAST',
          text: `${isFavorite ? 'Removed from' : 'Saved to'} favorites`,
          variant: `${isFavorite ? 'warning' : 'success'}`,
        });
        mutate();
      })
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      });
  };

  if (!movie) return <div className="">No movie found</div>;

  const {
    genres,
    _id,
    overview,
    poster,
    release_date,
    runtime,
    status,
    tagline,
    title,
  } = movie;
  const formattedReleaseDate = toDDMMYYYY(release_date);
  const formattedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  // const userScore = vote_average * 10;

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%),
           url(${poster})`,
          backgroundPosition: 'right -250px',
        }}
        className="p-8"
      >
        <div className="flex gap-8">
          <div className="flex w-1/3 min-w-fit overflow-hidden rounded-xl">
            <Image alt={title} src={`${poster}`} height={450} width={300} />
          </div>
          <div className="flex flex-col justify-center gap-3 text-white">
            <h2 className="text-4xl font-semibold">{title}</h2>
            <div className="flex gap-2">
              <div>{formattedReleaseDate}</div>
              <div className="flex">
                {genres.map((genre, i) => (
                  <div key={i}>{`${i ? ', ' : ''}${genre}`}</div>
                ))}
              </div>
              <div>{formattedRuntime}</div>
            </div>
            <div className="flex items-center gap-6">
              {/* <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-600 text-xl font-bold text-white">
                {userScore}
                <span className="text-xs">%</span>
              </div> */}
              <button
                className="group relative rounded-full bg-neutral-600 p-2"
                onClick={addRemoveFavorite}
              >
                <HeartIcon
                  height={20}
                  width={20}
                  className={
                    loginState.user && isFavorite
                      ? 'text-pink-600'
                      : 'text-white'
                  }
                />
                <Tooltip
                  text={
                    loginState.user
                      ? isFavorite
                        ? 'Remove from favorites'
                        : 'Mark as favorite'
                      : 'Login to add to favorites'
                  }
                />
              </button>
              <button className="group relative rounded-full bg-neutral-600 p-2">
                <HoverRating movieId={_id} />
                <Tooltip
                  text={
                    loginState.user ? 'Rate it!' : 'Login to rate this movie'
                  }
                />
              </button>
            </div>
            <h4 className="italic text-gray-400">{tagline}</h4>
            <div>
              <h3 className="mb-2 text-xl">Overview</h3>
              <p>{overview}</p>
            </div>
            <ul className="grid grid-cols-3 gap-y-4">
              <li>
                <h3 className="text-md font-semibold">Status</h3>
                <p className="text-xs">{status}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ReviewList movieId={_id} />
    </div>
  );
};

export default MovieDetails;

export const getServerSideProps = ({ query }) => {
  const { id } = query;
  return fetch(`http://localhost:3000/api/movies/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return { props: { movie: data } };
    })
    .catch((e) => {
      console.log('error => ', e);
      return { props: { movie: null } };
    });
};
