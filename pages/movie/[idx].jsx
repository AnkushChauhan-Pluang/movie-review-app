import Image from 'next/image';
import { tmdb } from 'config';
import { BookmarkIcon, HeartIcon, StarIcon } from '@heroicons/react/solid';
import Tooltip from '@components/ui/Tooltip';
import { useAuthContext } from 'contexts/AuthContext';
import axios from 'axios';
import useSWR from 'swr';
import { useState } from 'react';

const MovieDetails = ({ movie }) => {
  const {
    backdrop_path,
    budget,
    genres,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    revenue,
    runtime,
    status,
    tagline,
    title,
    vote_average,
    vote_count,
  } = movie;

  const { loginState } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const fetchProfile = async (url) => {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${loginState.token}` },
    });
    const { favorites, watchlist } = data;
    setIsFavorite(favorites.includes(id));
    setIsInWatchlist(watchlist.includes(id));
    return data;
  };

  const { mutate } = useSWR(
    loginState.token ? '/api/profile' : null,
    fetchProfile
  );

  const addRemoveFavorite = async () => {
    if (!loginState.user) return;
    console.log('Favorites clicked');
    try {
      const res = await axios.post(
        '/api/favorites',
        { movieId: id },
        { headers: { Authorization: `Bearer ${loginState.token}` } }
      );
      console.log(res);
    } catch (e) {
      console.log(e.response.data.error);
    }
    mutate();
  };

  const addRemoveWatchlist = async () => {
    if (!loginState.user) return;
    console.log('Watchlist clicked');
    try {
      const res = await axios.post(
        '/api/watchlist',
        { movieId: id },
        { headers: { Authorization: `Bearer ${loginState.token}` } }
      );
      console.log(res);
    } catch (e) {
      console.log(e.response.data.error);
    }
    mutate();
  };

  const giveRating = () => {
    if (!loginState.user) return;
    console.log('Rating clicked');
  };

  const formattedReleaseDate = release_date.split('-').reverse().join('/');
  const formattedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  const userScore = vote_average * 10;

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%),
           url(${tmdb.imageBaseUrl}${backdrop_path})`,
        }}
        className="bg-cover p-8"
      >
        <div className="flex gap-8">
          <div className="flex w-full overflow-hidden rounded-md">
            <Image
              alt={title}
              src={`${tmdb.imageBaseUrl}${poster_path}`}
              height={400}
              width={250}
            />
          </div>
          <div className="flex flex-col gap-3 text-white">
            <h2 className="text-4xl font-semibold">{title}</h2>
            <div className="flex gap-2">
              <div>{formattedReleaseDate}</div>
              <div className="flex">
                {genres.map((g, i) => (
                  <div key={g.id}>{`${i ? ', ' : ''}${g.name}`}</div>
                ))}
              </div>
              <div>{formattedRuntime}</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-600 text-xl font-bold text-white">
                {userScore}
                <span className="text-xs">%</span>
              </div>
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
              <button
                className="group relative rounded-full bg-neutral-600 p-2"
                onClick={addRemoveWatchlist}
              >
                <BookmarkIcon
                  height={20}
                  width={20}
                  className={
                    loginState.user && isInWatchlist
                      ? 'text-orange-500'
                      : 'text-white'
                  }
                />
                <Tooltip
                  text={
                    loginState.user
                      ? isInWatchlist
                        ? 'Remove from watchlist'
                        : 'Add to watchlist'
                      : 'Login to add to watchlist'
                  }
                />
              </button>
              <button
                className="group relative rounded-full bg-neutral-600 p-2"
                onClick={giveRating}
              >
                <StarIcon height={20} width={20} />
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
              <li>
                <h3 className="text-md font-semibold">Original Language</h3>
                <p className="text-xs">{original_language}</p>
              </li>
              <li>
                <h3 className="text-md font-semibold">Budget</h3>
                <p className="text-xs">{budget > 0 ? `$${budget}` : '-'}</p>
              </li>
              <li>
                <h3 className="text-md font-semibold">Revenue</h3>
                <p className="text-xs">{revenue > 0 ? `$${revenue}` : '-'}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

export const getServerSideProps = async ({ query }) => {
  const { id } = query;
  const res = await fetch(
    `${tmdb.movieBaseUrl}${id}?&api_key=${process.env.TMDB_API_KEY}`
  );
  const movie = await res.json();
  return { props: { movie } };
};
