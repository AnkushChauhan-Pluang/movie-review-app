import ProfileLayout from '@components/common/ProfileLayout';
import UsersMovieList from '@components/movie/UsersMovieList';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import React from 'react';
import useSWR from 'swr';

const Favorites = () => {
  const { loginState } = useAuthContext();

  const fetchFavorites = (url) => {
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
    loginState.token ? '/api/users/favorites' : null,
    fetchFavorites
  );

  return (
    <ProfileLayout>
      {data ? (
        <UsersMovieList movies={data.favorites} />
      ) : (
        <div>Loading...</div>
      )}
    </ProfileLayout>
  );
};

export default Favorites;
