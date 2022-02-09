import Image from 'next/image';
import { tmdb } from 'config';
import { BookmarkIcon, HeartIcon, StarIcon } from '@heroicons/react/outline';

const MovieDetails = ({ movie }) => {
  const {
    backdrop_path,
    budget,
    genres,
    imdb_id,
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

  // console.log(movie);

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
              src={`${tmdb.imageBaseUrl}${poster_path}`}
              height={400}
              width={250}
            />
          </div>
          <div className="flex flex-col gap-3 text-white">
            <h2 className="text-4xl font-semibold">{original_title}</h2>
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
              <button className="rounded-full bg-neutral-600 p-2">
                <HeartIcon height={20} width={20} />
              </button>
              <button className="rounded-full bg-neutral-600 p-2">
                <BookmarkIcon height={20} width={20} />
              </button>
              <button className="rounded-full bg-neutral-600 p-2">
                <StarIcon height={20} width={20} />
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
