import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../auth/useAuth'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/buttons/buttons'
import BBLogo from '../assets/images/BBLogo.svg'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error on login:', error)
      throw new Error('Login failed')
    }
  }

  return (
    <div className="flex h-screen">
      <div className="bg-BBblue hidden lg:block w-1/2">
        <div className="p-8">
          <img src={BBLogo} alt="Logo" className="h-47 w-47" />
        </div>
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 bg-BBwhite">
        <div className="w-full max-w-md px-8 py-8">
          <div className="pb-4">
            <h1 className="text-5xl font-unbounded mb-2 text-BBprimary1">
              Sign In
            </h1>
            <h2 className="text-3xl font-unbounded mb-4 text-BBmagenta">
              Welcome back!
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full px-4 py-2 border-4 border-BBblue rounded-full focus:outline-none focus:border-opacity-70 placeholder-BBblue"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-4 border-BBblue rounded-full focus:outline-none focus:border-opacity-70 placeholder-BBblue"
                />
              </div>
            </div>
            <div className="pt-16">
              <PrimaryButton
                text="Log In"
                type="submit"
                className="bg-BBmagenta text-white w-full"
              />
            </div>
          </form>
          <div>
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
