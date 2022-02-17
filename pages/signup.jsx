import SignupView from '@components/auth/SignupView';
import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

const Signup = () => {
  const { loginState } = useAuthContext();
  const router = useRouter();

  if (loginState.user) router.replace('/');
  
  return (
    <div className="my-8">
      <SignupView />
    </div>
  );
};

export default Signup;
