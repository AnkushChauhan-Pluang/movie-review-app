import { useUI } from '@components/ui/uiContext';
import { Menu } from '@headlessui/react';
import {
  CogIcon,
  HeartIcon,
  LogoutIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import { logout } from 'utils/authHelpers';
import Avatar from './Avatar';
import Link from './Link';

const ProfileDropdown = () => {
  const { loginState, loginDispatch } = useAuthContext();
  const { dispatch } = useUI();
  const router = useRouter();
  const username = loginState.user && loginState.user.username;

  const menuItems = [
    {
      meta: 'View Profile',
      name: username,
      icon: UserCircleIcon,
      href: `/${username}`,
    },
    // { name: 'Favorites', icon: HeartIcon, href: `/${username}/favorites` },
    // { name: 'Settings', icon: CogIcon, href: '#' },
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex focus-visible:rounded-full">
        <Avatar />
      </Menu.Button>
      <Menu.Items
        className="absolute right-0 z-50 mt-3 w-44 rounded-md bg-white p-1 shadow-md
       ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {loginState.user.role !== 'ADMIN' &&
          menuItems.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={`${
                    active && 'bg-gray-100'
                  } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm`}
                >
                  <item.icon className="h-5 w-5" />
                  <div className="">
                    <div className="">{item.name}</div>
                    <div className="text-xs text-neutral-500">{item.meta}</div>
                  </div>
                </Link>
              )}
            </Menu.Item>
          ))}
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active && 'bg-gray-100'
              } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm`}
              onClick={() => {
                logout();
                loginDispatch({ type: 'LOGOUT' });
                dispatch({
                  type: 'OPEN_TOAST',
                  text: 'Logged out!',
                  variant: 'warning',
                });
                router.push('/');
              }}
            >
              <LogoutIcon className="h-5 w-5" />
              Log Out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ProfileDropdown;
