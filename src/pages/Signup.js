import { useState } from "react";
import { Link } from "react-router-dom";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3">
        <label htmlFor="email" className="text-gray-700 font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="hello@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 mb-6 text-gray-700 border rounded shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        <label htmlFor="password" className="text-gray-700 font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 mb-6 text-gray-700 border rounded shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        <label htmlFor="password" className="text-gray-700 font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="******"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full px-4 py-2 mb-16 text-gray-700 border rounded shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign In
        </button>
        <div className="text-gray-700 text-center pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-medium">
            Sign in here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
