import axios from 'axios';


const useAuth = () => {

  const onError = (message) => {
    alert(message)
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      const jwtToken = response.data.token;
      localStorage.setItem('jwtToken', jwtToken);

      console.log(response.data);
    } catch (error) {
      console.error('Error on login:', error);
      throw new Error('Login failed');
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        email,
        password
      });
      const jwtToken = response.data.token;
      localStorage.setItem('jwtToken', jwtToken);

      console.log(response.data);
    } catch (error) {
      if (error.response.data.startsWith('E11000')) return onError('That email is taken.');
    }
  };

  const signout = () => {
    localStorage.removeItem('jwtToken');
  };

  return {
    signup,
    signout,
    login,
  };
};

export default useAuth;
