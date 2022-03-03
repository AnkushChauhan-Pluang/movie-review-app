import ProfileLayout from '@components/common/ProfileLayout';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import React from 'react';
import useSWR from 'swr';

const Profile = () => {
  const { loginState } = useAuthContext();

  const fetchProfile = (url) => {
    return axios
      .get(url, {
        headers: { Authorization: `Bearer ${loginState.token}` },
      })
      .then(({ data }) => data)
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      });
  };

  const { data } = useSWR(
    loginState.token ? '/api/users/me' : null,
    fetchProfile
  );

  return (
    <ProfileLayout>
      <div className="m-10 flex items-center gap-8">
        <div className="font-bold">Username</div>
        <div className="w-56 rounded border px-4 py-2">{data.username}</div>
        <div className="font-bold">Email</div>
        <div className="w-56 rounded border px-4 py-2">{data.email}</div>
      </div>
      <div className="m-10 flex items-center gap-8">
        <div className="font-bold">Favorites</div>
        <div className="w-56 rounded border px-4 py-2">
          {data.favorites.length}
        </div>
      </div>
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
    </ProfileLayout>
  );
};

export default Profile;
