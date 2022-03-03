import FormField from '@components/common/FormField';
import Button from '@components/ui/Button';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { loginUser } from 'utils/authHelpers';
import { SignupSchema } from 'utils/validationSchema';

const EditUser = () => {
  const { loginState, loginDispatch } = useAuthContext();
  const router = useRouter();
  const { userId } = router.query;

  const fetchUser = (url) => {
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

  const { data: user } = useSWR(
    loginState.token ? `/api/users/${userId}` : null,
    fetchUser
  );
  
  if (!user) return <div>Loading...</div>;
  
  const { email, username } = user;
  const initialValues = {
    email,
    username,
  };

  const signup = ({ email, username }, { setSubmitting }) => {
    setError('');
    axios
      .post('api/auth/signup', { email, username })
      .then(({ data }) => {
        loginUser(data.token, data.user);
        loginDispatch({
          type: 'LOGIN_USER',
          token: data.token,
          user: data.user,
        });
        router.push('/');
      })
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      })
      .finally(setSubmitting(false));
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
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Update User
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUser;
