import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import axios from 'axios';


const onError = (error) => {
  return <Alert severity="error">{error}</Alert>
}

const useAuth = () => {

  const signup = (email, password) => {

  }

  return {
    signUp
  }
}

export { useAuth }
