import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginLogo from '../components/LoginLogo'
import AuthContext from '../auth/AuthContext'
import { PrimaryButton, GhostButton } from '../components/buttons/buttons'
import splashManReading from '../assets/images/illustrations/splashManReading.svg'

function Landing() {
  const { currentUser } = React.useContext(AuthContext)
  const navigate = useNavigate()

  if (currentUser) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="h-screen bg-BBpurple text-white">
      <LoginLogo />

      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <img src={splashManReading} alt="Man reading" className="h-96" />
        </div>
        <h1 className="pt-8 text-3xl text-center font-unbounded">
          It’s time to turn the page.
        </h1>
        <div className="flex items-center justify-center p-8">
          <div className="space-x-2">
            <GhostButton
              text="Sign Up"
              onClick={() => navigate('/signup')}
              className="p-2"
            />
            <PrimaryButton
              text="Login"
              color="BBgreen"
              className="text-BBprimary1"
              onClick={() => navigate('/login')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
