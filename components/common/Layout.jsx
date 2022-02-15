import { useAuthContext } from 'contexts/AuthContext';
import Link from 'next/link';
import { useEffect } from 'react';
import { loginUser, logout } from 'utils/authHelpers';

const Layout = ({ children }) => {
  const { loginState, loginDispatch } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      loginUser(token, user);
      loginDispatch({ type: 'LOGIN_USER', token, user });
    }
  }, [loginDispatch]);

  return (
    <div>
      {loginState.user ? (
        <div className="flex items-center justify-end gap-8 bg-neutral-900 p-4">
          <div className="text-white">{loginState.user.username}</div>
          <button
            className="rounded bg-white px-3 py-1 font-semibold"
            onClick={() => {
              logout();
              loginDispatch({ type: 'LOGOUT' });
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <nav className="flex justify-end gap-8 bg-neutral-900 p-4">
          <Link href="/login">
            <a className="text-xl font-semibold text-white hover:text-neutral-300">
              Login
            </a>
          </Link>
          <Link href="/signup">
            <a className="text-xl font-semibold text-white hover:text-neutral-300">
              Signup
            </a>
          </Link>
        </nav>
      )}
      {children}
    </div>
  );
};

export default Layout;
