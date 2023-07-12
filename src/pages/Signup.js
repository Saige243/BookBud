import useAuth from '../auth/useAuth'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Signup = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      )
      navigate('/dashboard')
    } catch (error) {
      console.error('Error on login:', error)
      throw new Error('Login failed')
    }
    setSubmitting(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-2">
            <label htmlFor="firstName" className="block mb-2 font-medium">
              First Name
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastName" className="block mb-2 font-medium">
              Last Name
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/" className="text-blue-500">
          Log In
        </Link>
      </p>
    </div>
  )
}

export default Signup
