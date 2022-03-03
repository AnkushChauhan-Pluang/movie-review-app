import { useUI } from '@components/ui/uiContext';
import { Delete } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Dashboard = () => {
  const router = useRouter();
  const { dispatch } = useUI();
  const { loginState } = useAuthContext();

  const fetchUsers = (url) => {
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

  const { data: users } = useSWR(loginState.token ? `/api/users` : null, fetchUsers);
  // console.log(users);
  const headers = [
    { key: 'id', title: 'S. No.' },
    { key: 'username', title: 'Username' },
    { key: 'email', title: 'Email' },
    { key: 'action', title: 'Action' },
  ];

  const handleDelete = (userId) => {
    dispatch({
      type: 'OPEN_MODAL',
      view: 'CONFIRM_DELETE',
      route: 'users',
      id: userId,
    });
  };

  return (
    <main className="m-4">
      <h1 className="mb-2 text-2xl font-medium">Movie Review App Users</h1>
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
            {users &&
              users.map((user, i) => (
                <tr key={user._id} className="hover:bg-neutral-50">
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">
                    <Link href={`/${user.username}`}>
                      <a className="py-2 transition-all hover:text-indigo-500 hover:underline">
                        {user.username}
                      </a>
                    </Link>
                  </td>
                  <td className="px-3 py-2">{user.email}</td>
                  <td className="px-3 py-2">
                    {/* <Chip
                      label="Edit"
                      color="primary"
                      size="small"
                      onClick={() =>
                        router.push(`/admin/users/edit/${user._id}`)
                      }
                    /> */}
                    <IconButton
                      className="ml-4"
                      color="error"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!users > 0 && (
          <div className="p-10 text-center">No data found</div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
