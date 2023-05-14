import axios from 'axios';

const useAuth = () => {
  const signup = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        // const response = await axios.post('http://127.0.0.1:3001/signup', {
        email,
        password
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error on signup:', error.response.data);
    }
  };


  return {
    signup,
  };
};

export default useAuth;
