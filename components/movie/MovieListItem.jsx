import Link from '@components/common/Link';
import { tmdb } from 'config';
import Image from 'next/image';
import React from 'react';

const MovieListItem = ({ movie }) => {
  // console.log(movie)
  const urlTitle = movie.title
    .replace(':', '')
    .replaceAll(' ', '-')
    .toLowerCase();

  const href = `/movie/${urlTitle}?id=${movie.id}`;

  return (
    <div className="">
      <div className="flex overflow-hidden rounded-md">
        <Link href={href} className="flex">
          <Image
            src={`${tmdb.imageBaseUrl}${movie.poster_path}`}
            height={300}
            width={200}
            alt={movie.title}
          />
        </Link>
      </div>
      <Link href={href}>
        <h2 className="max-w-[200px]">{movie.title}</h2>
      </Link>
    </div>
  );
};

export default MovieListItem;
