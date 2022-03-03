import { useUI } from '@components/ui/uiContext';
import { Delete } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Movies = ({ movies }) => {
  // console.log('movies', movies);
  const router = useRouter();
  const { dispatch } = useUI();
  const headers = [
    { key: 'id', title: 'S. No.' },
    { key: 'title', title: 'Title' },
    { key: 'status', title: 'Status' },
    { key: 'release_date', title: 'Release date' },
    { key: 'runtime', title: 'Runtime' },
    { key: 'action', title: 'Action' },
  ];

  const handleDelete = (movieId) => {
    dispatch({
      type: 'OPEN_MODAL',
      view: 'CONFIRM_DELETE',
      route: 'movies',
      id: movieId,
    });
  };

  return (
    <main className="m-4">
      <h1 className="mb-2 text-2xl font-medium">Movies List</h1>
      <button className="mb-4 rounded bg-blue-600 px-6 py-2 text-white">
        <Link href="/admin/movies/add">
          <a>+ Add new movie</a>
        </Link>
      </button>
      <div className="overflow-hidden rounded border shadow-md">
        <table className="min-w-full divide-y">
          <thead className="bg-neutral-100">
            <tr>
              {headers.map(({ key, title }) => (
                <th
                  key={key}
                  className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-500"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {movies &&
              movies.map((movie, i) => (
                <tr key={movie._id} className="hover:bg-neutral-50">
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">{movie.title}</td>
                  <td className="px-3 py-2">{movie.status}</td>
                  <td className="px-3 py-2">{movie.release_date}</td>
                  <td className="px-3 py-2">{movie.runtime}</td>
                  <td className="px-3 py-2">
                    <Chip
                      label="Edit"
                      color="primary"
                      size="small"
                      onClick={() =>
                        router.push(`/admin/movies/edit/${movie._id}`)
                      }
                    />
                    <IconButton
                      className="ml-4"
                      color="error"
                      onClick={() => handleDelete(movie._id)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!movies.length > 0 && (
          <div className="p-10 text-center">No data found</div>
        )}
      </div>
    </main>
  );
};

export default Movies;

export const getServerSideProps = () => {
  return fetch('http://localhost:3000/api/movies')
    .then((res) => res.json())
    .then((data) => {
      const movies = data.data.movies;
      return { props: { movies } };
    });
};
