import ProfileLayout from '@components/common/ProfileLayout';
import UsersMovieList from '@components/movie/UsersMovieList';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import useSWR from 'swr';

const Ratings = () => {
  const { loginState } = useAuthContext();

  const fetchRatings = (url) => {
    return axios
      .get(url, {
        headers: { Authorization: `Bearer ${loginState.token}` },
      })
      .then(({ data }) => data)
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      })
  };

  const { data } = useSWR(
    loginState.token ? `/api/ratings?userId=${loginState.user._id}` : null,
    fetchRatings
  );

  return (
    <ProfileLayout>
      {data ? (
        <UsersMovieList
          movies={data.map((x) => {
            return { ...x.movieId, rating: x.value };
          })}
        />
      ) : (
        <div>Loading...</div>
      )}
      {/* {data && (
        <pre>
          {JSON.stringify(
            data.map((x) => {
              return { ...x.movieId, rating: x.value };
            }),
            null,
            2
          )}
        </pre>
      )} */}
    </ProfileLayout>
  );
};

export default Ratings;
