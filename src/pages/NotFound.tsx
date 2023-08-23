import React from 'react';
import { PrimaryButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate()

  const navigateBack = () => {
    navigate(-1)
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center text-center flex-col">
      <h1 className='font-bold text-3xl'>404 - Page not found</h1>
      <p className='text-lg'>Sorry, the page you are looking for does not exist.</p>
      <PrimaryButton
        text='Go back'
        onClick={navigateBack}
      />
    </div>
  );
};

export default NotFound;
