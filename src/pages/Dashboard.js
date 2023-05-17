import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../auth/useAuth";
import CircularProgress from '@mui/material/CircularProgress';


function Dashboard({ books }) {
  // const { isLoading } = useAuth0();
  // const { userMetadata } = useAuth()

  // if (isLoading) {
  //   return (
  //     <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
  //       <CircularProgress />
  //     </div>
  //   )
  // }

  return (
    <div className='px-6'>
      <h2>Hi, User!</h2>
      <p>Email: </p>
      <div className='flex justify-center flex-row flex-wrap'>
      </div>
    </div>
  )
}

export default Dashboard
