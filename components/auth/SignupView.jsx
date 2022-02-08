import FormField from '@components/common/FormField'
import Link from '@components/common/Link'
import Button from '@components/ui/Button'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { SignupSchema } from 'utils/validationSchema'

const SignupView = () => {
  const [error, setError] = useState('')
  const initialValues = {
    email: '',
    fullName: '',
    username: '',
    password: '',
  }

  const signup = async (values) => {
    try {
      setError('')
      console.log(values)
    } catch (e) {
      //   setError(e.response.data.message)
    }
  }

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
          <FormField type="text" name="fullName" placeholder="Full Name" />
          <FormField type="text" name="username" placeholder="Username" />
          <FormField type="password" name="password" placeholder="Password" />
          <Button type="submit" disabled={isSubmitting || !isValid}>
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
  )
}

export default SignupView
