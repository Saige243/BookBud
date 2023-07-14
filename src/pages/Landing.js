import React from 'react'
import BBLogo from '../assets/images/BBLogo.svg'
import { PrimaryButton, GhostButton } from '../components/buttons/buttons'

function Landing() {
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
          <div className="space-x-2">
            <GhostButton text="Sign Up" />
            <PrimaryButton text="Login" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
