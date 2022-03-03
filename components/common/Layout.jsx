import { Toast } from '@components/ui';
import Modal from '@components/ui/Modal';
import { useUI } from '@components/ui/uiContext';
import { useAuthContext } from 'contexts/AuthContext';
import Link from 'next/link';
import { useEffect } from 'react';
import { loginUser } from 'utils/authHelpers';
import ConfirmDelete from './ConfirmDelete';
import ProfileDropdown from './ProfileDropdown';

const Layout = ({ children }) => {
  const { loginState, loginDispatch } = useAuthContext();
  const {
    state: { modalView },
  } = useUI();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      loginUser(token, user);
      loginDispatch({ type: 'LOGIN_USER', token, user });
    }
  }, [loginDispatch]);

  const getModalView = () => {
    switch (modalView) {
      case 'CONFIRM_DELETE':
        return <ConfirmDelete />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end gap-8 bg-neutral-900 p-4">
        {loginState.user && loginState.user.role !== 'ADMIN' && (
          <>
            <Link href="/">
              <a className="text-xl text-white">Home</a>
            </Link>
            <Link href={`/${loginState.user.username}/favorites`}>
              <a className="text-xl text-white">Favorites</a>
            </Link>
          </>
        )}
        {loginState.user ? (
          <>
            {loginState.user.role === 'ADMIN' && (
              <Link href="/admin/dashboard">
                <a className="text-xl text-white">Admin Dashboard</a>
              </Link>
            )}
            <ProfileDropdown />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      {children}
      <Modal>{getModalView()}</Modal>
      <Toast />
    </div>
  );
};

export default Layout;
