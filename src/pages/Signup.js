import useAuth from '../auth/useAuth'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { PrimaryButton } from '../components/buttons/buttons'

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
      console.error('Error on signup:', error)
      throw new Error('Signup failed')
    }
    setSubmitting(false)
  }

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block w-1/2 bg-BBgreen"></div>

      <div className="flex items-center justify-center w-full lg:w-1/2 bg-BBwhite">
        <div className="w-full max-w-md px-8 py-8">
          <div className="pb-4">
            <h1 className="text-4xl font-unbounded mb-2 text-BBprimary1">
              Create Account
            </h1>
            <h2 className="text-2xl font-unbounded mb-4 text-BBmagenta">
              Nice to meet you!
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="space-y-6">
                <div>
                  <Field
                    placeholder="First Name"
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-2 border-4 border-BBblue rounded-full focus:outline-none focus:border-opacity-70 placeholder-BBblue"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    placeholder="Last Name"
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-2 border-4 border-BBblue rounded-full focus:outline-none focus:border-opacity-70 placeholder-BBblue"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border-4 border-BBblue rounded-full focus:outline-none focus:border-opacity-70 placeholder-BBblue"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    placeholder="Password"
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border-4 border-BBblue rounded-full focus:outline-none focus:border-opacity-70 placeholder-BBblue"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="pt-16">
                <PrimaryButton
                  text="Sign Up"
                  type="submit"
                  className="bg-BBmagenta text-white w-full"
                />
              </div>
            </Form>
          </Formik>
          <div className="flex justify-center mt-4">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
