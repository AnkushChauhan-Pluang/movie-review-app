import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup.string().email('Invalid email').matches().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const SignupSchema = yup.object({
  email: yup.string().email('Invalid email').required(),
  username: yup.string().min(3).required('Username is required'),
  password: yup.string().min(3).required('Password is required'),
  confirmPassword: yup
    .string()
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both password need to be the same'),
    })
    .required('Confirmation password is required'),
});

export const MovieSchema = yup.object({
  title: yup.string().min(3).required(),
  tagline: yup.string().min(3).required('Tagline is required'),
  overview: yup.string().min(3).required('Overview is required'),
  runtime: yup.number().required('Runtime is required'),
  release_date: yup.date().required('Release date is required'),
});
