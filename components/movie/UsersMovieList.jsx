import React from 'react'
import UsersMovieListItem from './UsersMovieListItem'

const UsersMovieList = ({ movies }) => {
  return (
    <main className="p-8">
      <div className="flex flex-wrap justify-center gap-8">
        {movies.map((movie) => (
          <UsersMovieListItem key={movie._id} movie={movie} />
        ))}
      </div>
    </main>
  )
}

export default UsersMovieList
