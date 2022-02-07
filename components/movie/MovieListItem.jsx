import Image from "next/image";
import React from "react";

const MovieListItem = ({ movie }) => {
  return (
    <div className="">
      <div className="flex overflow-hidden rounded-md">
        <Image
          src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
          height={300}
          width={200}
        />
      </div>
      <p className="max-w-[200px]">{movie.original_title}</p>
    </div>
  );
};

export default MovieListItem;
