import { useAuth0 } from "@auth0/auth0-react";
import { PrimaryButton } from "../components/Buttons";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const getStarted = () => {
    loginWithRedirect()
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1>Welcome to BookBud!</h1>
      <PrimaryButton
        onClick={getStarted}
        text="Get Started"
      />
    </div>
  );
};

export default Login;
