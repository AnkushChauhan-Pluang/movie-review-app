import React from 'react'
import MovieListItem from './MovieListItem'

const Movies = ({ movies }) => {
  return (
    <main className="p-8">
      <div className="flex flex-wrap justify-center gap-4 py-6">
        {movies.map((movie) => (
          <MovieListItem key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  )
}

export default Movies
