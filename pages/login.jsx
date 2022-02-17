import LoginView from '@components/auth/LoginView';
import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

const Login = () => {
  const { loginState } = useAuthContext();
  const router = useRouter();

  if (loginState.user) router.replace('/');

  return (
    <div className="my-8">
      <LoginView />
    </div>
  );
};

export default Login;
