import Link from '@components/common/Link';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { toDDMMYYYY } from 'utils/dateFormatter';

const UsersMovieListItem = ({ movie }) => {
  // console.log(movie)
  const urlTitle = movie.title
    .replace(':', '')
    .replaceAll(' ', '-')
    .toLowerCase();

  const href = `/movie/${urlTitle}?id=${movie._id}`;
  const rating = movie.rating * 2;

  return (
    <div className="flex w-full overflow-hidden rounded-2xl border shadow-lg">
      <div className="flex min-w-[150px]">
        <Link href={href} className="flex">
          <Image
            src={movie.poster}
            height={200}
            width={150}
            alt={movie.title}
          />
        </Link>
      </div>
      <div className="p-4">
        <Link href={href}>
          <h2 className="text-lg font-semibold hover:text-indigo-600">
            {movie.title}
          </h2>
        </Link>
        <div className="text-sm text-neutral-400">
          {toDDMMYYYY(movie.release_date)}
        </div>
        <div className="text-sm">{movie.overview}</div>
        <div className="mt-4 flex items-center gap-3">
          <Avatar
            className="bg-indigo-500 text-sm"
            sx={{ width: 32, height: 32 }}
          >
            {rating}
          </Avatar>
          <span className="">Your rating</span>
        </div>
      </div>
    </div>
  );
};

export default UsersMovieListItem;
