import FormField from '@components/common/FormField';
import Link from '@components/common/Link';
import Button from '@components/ui/Button';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { loginUser } from 'utils/authHelpers';
import { LoginSchema } from 'utils/validationSchema';

const LoginView = () => {
  const [error, setError] = useState('');
  const { loginDispatch } = useAuthContext();
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };

  const login = async (values) => {
    try {
      setError('');
      let { data } = await axios.post('api/auth/login', values);
      // console.log(data);
      loginUser(data.token, data.user);
      loginDispatch({ type: 'LOGIN_USER', token: data.token, user: data.user });
      router.push('/');
    } catch (e) {
      console.log(e.response);
      setError(e.response.data.error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      validateOnMount
      onSubmit={login}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="mx-auto flex w-80 flex-col gap-5">
          <FormField type="email" name="email" placeholder="Email" />
          <FormField type="password" name="password" placeholder="Password" />
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Log In
          </Button>
          <div className="text-center text-red-600">{error}</div>
          <div className="">
            <p>
              {`Don't have an account? `}
              <span>
                <Link href="/signup" className="font-bold hover:opacity-70">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginView;
