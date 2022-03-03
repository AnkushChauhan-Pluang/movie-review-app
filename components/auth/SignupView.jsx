import FormField from '@components/common/FormField';
import Link from '@components/common/Link';
import Button from '@components/ui/Button';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { loginUser } from 'utils/authHelpers';
import { SignupSchema } from 'utils/validationSchema';

const SignupView = () => {
  const [error, setError] = useState('');
  const { loginDispatch } = useAuthContext();
  const router = useRouter();
  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const signup = ({ email, username, password }) => {
    setError('');
    axios
      .post('api/auth/signup', { email, username, password })
      .then(({ data }) => {
        loginUser(data.token, data.user);
        loginDispatch({
          type: 'LOGIN_USER',
          token: data.token,
          user: data.user,
        });
        return router.push('/');
      })
      .then(() =>
        dispatch({
          type: 'OPEN_TOAST',
          text: `Signed up successfully`,
          variant: 'success',
        })
      )
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      })
      // .finally(setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      validateOnMount
      onSubmit={signup}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="mx-auto flex w-80 flex-col gap-5">
          <FormField type="email" name="email" placeholder="Email" />
          <FormField type="text" name="username" placeholder="Username" />
          <FormField type="password" name="password" placeholder="Password" />
          <FormField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <Button type="submit" disabled={isSubmitting || !isValid} loading={isSubmitting} >
            Sign up
          </Button>
          <div className="text-center text-red-600">{error}</div>
          <div className="">
            <p>
              Have an account?{' '}
              <span>
                <Link href="/login" className="font-bold hover:opacity-70">
                  Log in
                </Link>
              </span>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupView;
