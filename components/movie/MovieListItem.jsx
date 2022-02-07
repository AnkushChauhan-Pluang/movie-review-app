import Link from '@components/common/Link'
import Image from 'next/image'
import React from 'react'

const MovieListItem = ({ movie }) => {
  // console.log(movie)
  const urlTitle = movie.original_title
    .replace(':', '')
    .replaceAll(' ', '-')
    .toLowerCase()

  const href = `/movie/${urlTitle}?id=${movie.id}`

  return (
    <div className="">
      <div className="flex overflow-hidden rounded-md">
        <Link href={href}>
          <Image
            src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
            height={300}
            width={200}
          />
        </Link>
      </div>
      <Link href={href}>
        <h2 className="max-w-[200px]">{movie.original_title}</h2>
      </Link>
    </div>
  )
}

export default MovieListItem
