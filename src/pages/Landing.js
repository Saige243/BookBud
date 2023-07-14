import React from 'react'
import splashManReading from '../assets/images/illustrations/splashManReading.svg'
import { PrimaryButton, GhostButton } from '../components/buttons/buttons'
import { useNavigate } from 'react-router-dom'
import LoginLogo from '../components/LoginLogo'

function Landing() {
  const navigate = useNavigate()
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
            <GhostButton text="Sign Up" onClick={() => navigate('/signup')} />
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
