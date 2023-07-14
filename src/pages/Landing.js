import React from 'react'
import BBLogo from '../assets/images/BBLogo.svg'
import { PrimaryButton, GhostButton } from '../components/buttons/buttons'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()
  return (
    <div className="h-screen bg-BBpurple text-white">
      <div className="p-8">
        <img src={BBLogo} alt="Logo" className="h-47 w-47" />
      </div>
      <div>
        <h1 className="text-4xl text-center font-unbounded">
          It’s time to turn the page.
        </h1>
        <div className="flex align-middle justify-center p-12">
          <div className="space-x-2 ">
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
