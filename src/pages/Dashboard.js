import { useAuth0 } from "@auth0/auth0-react";
import { GetUserMetadata } from "../auth/Auth";
import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryButton } from "../components/Buttons";
import Navbar from "../components/Navbar";


function Dashboard() {
  const { isLoading } = useAuth0();
  const userMetaData = GetUserMetadata()
  const { name, email } = userMetaData

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <h2>Hi, {name}!</h2>
      <p>Email: {email}</p>
    </>
  )
}

export default Dashboard
