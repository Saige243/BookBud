import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../auth/Auth";
import CircularProgress from '@mui/material/CircularProgress';


function Dashboard() {
  const { isLoading } = useAuth0();
  const { userMetadata } = useAuth()
  const { name, email } = userMetadata

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
