import * as yup from 'yup'

export const LoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export const SignupSchema = yup.object({
  email: yup.string().email().required(),
  fullName: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
})
