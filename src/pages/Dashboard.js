import { useAuth0 } from "@auth0/auth0-react";
import { GetUserMetadata } from "../auth/Auth";
import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryButton } from "../components/Buttons";


function Dashboard() {
  const { logout, isAuthenticated, isLoading } = useAuth0();
  const userMetaData = GetUserMetadata()
  const { name, email, picture } = userMetaData

  const logoutButtonClick = () => {
    logout({ logoutParams: { returnTo: "http://localhost:3000/" } })
  }

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    isAuthenticated && (
      <div>
        <PrimaryButton
          onClick={logoutButtonClick}
          text="Logout"
        />
        <img src={picture} alt={name} />
        <h2>Hi, {name}!</h2>
        <p>Email: {email}</p>
      </div>
    )
  )
}

export default Dashboard
