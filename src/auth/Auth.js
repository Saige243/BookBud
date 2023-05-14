import axios from 'axios';

const useAuth = () => {
  const onError = (message) => {
    alert(message)
  }

  const signup = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        email,
        password
      });
      console.log(response.data);
    } catch (error) {
      // console.error('Error on signup:', error.response.data);
      if (error.response.data.startsWith('E11000')) return onError('That email is taken.');
    }
  };

  return {
    signup,
  };
};

export default useAuth;
