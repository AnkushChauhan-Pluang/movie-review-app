import FormField from '@components/common/FormField';
import Link from '@components/common/Link';
import Button from '@components/ui/Button';
import { useUI } from '@components/ui/uiContext';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { loginUser } from 'utils/authHelpers';
import { LoginSchema } from 'utils/validationSchema';

const LoginView = () => {
  const { loginDispatch } = useAuthContext();
  const { dispatch } = useUI();
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };

  const login = (values) => {
    axios
      .post('api/auth/login', values)
      .then(({ data }) => {
        loginUser(data.token, data.user);
        loginDispatch({
          type: 'LOGIN_USER',
          token: data.token,
          user: data.user,
        });
        return data.user.role === 'ADMIN'
          ? router.push('/admin/dashboard')
          : router.push('/');
      })
      .then(() =>
        dispatch({
          type: 'OPEN_TOAST',
          text: `You are now logged in`,
          variant: 'success',
        })
      )
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      });
    // .finally(setSubmitting(false));
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
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            loading={isSubmitting}
          >
            Log In
          </Button>
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
