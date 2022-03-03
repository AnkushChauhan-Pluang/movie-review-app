import Link from '@components/common/Link';
import { Chip } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { toDDMMYYYY } from 'utils/dateFormatter';

const MovieListItem = ({ movie }) => {
  // console.log(movie)
  const urlTitle = movie.title
    .replace(':', '')
    .replaceAll(' ', '-')
    .toLowerCase();

  const href = `/movie/${urlTitle}?id=${movie._id}`;

  return (
    <div className="max-w-[350px] overflow-hidden rounded-2xl border shadow-lg transition-all hover:-translate-y-2">
      <div className="flex">
        <Link href={href} className="flex">
          <Image
            src={movie.poster}
            height={500}
            width={350}
            alt={movie.title}
          />
        </Link>
      </div>
      <div className="p-4">
        <Link href={href}>
          <h2 className="text-lg max-w-[320px] font-semibold">{movie.title}</h2>
        </Link>
        <div className="text-sm text-neutral-400">
          {toDDMMYYYY(movie.release_date)}
        </div>
        <em className="font-semibold text-neutral-700">
          {movie.tagline}
        </em>
        <div className="text-sm">{`${movie.overview.substring(0, 50)}...`}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <Chip key={genre} label={genre} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieListItem;
