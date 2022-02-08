import Image from 'next/image'
import { tmdb } from 'config'

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
  } = movie

  console.log(movie);

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%),
           url(${tmdb.imageBaseUrl}${backdrop_path})`,
        }}
        className="bg-cover p-8"
      >
        <div className="flex">
          <div className="flex w-full overflow-hidden rounded-md">
            <Image
              src={`${tmdb.imageBaseUrl}${poster_path}`}
              height={400}
              width={250}
            />
          </div>
          <div className="text-white">
            <h2 className="">{original_title}</h2>
            <div className="flex gap-2">
              <div className="">{release_date}</div>
              <div className="flex gap-2">
                {genres.map((g) => (
                  <div key={g.id} className="">
                    {g.name}
                  </div>
                ))}
              </div>
              <div className="">{runtime}</div>
            </div>
            <h3 className="">Overview</h3>
            <p className="">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails

export const getServerSideProps = async ({ query }) => {
  const { id } = query
  const res = await fetch(
    `${tmdb.movieBaseUrl}${id}?&api_key=${process.env.TMDB_API_KEY}`
  )
  const movie = await res.json()
  return { props: { movie } }
}
