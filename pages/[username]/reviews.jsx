import ProfileLayout from '@components/common/ProfileLayout';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import React from 'react';
import useSWR from 'swr';

const Reviews = () => {
  const { loginState } = useAuthContext();

  const fetchReviews = (url) => {
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
    loginState.token ? `/api/reviews?userId=${loginState.user._id}` : null,
    fetchReviews
  );

  return (
    <ProfileLayout>
      {/* {data ? (
        <UsersMovieList movies={data.favorites} />
      ) : (
        <div>Loading...</div>
      )} */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </ProfileLayout>
  );
};

export default Reviews;
