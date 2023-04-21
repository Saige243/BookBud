import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

function Dashboard() {
  const { logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState({});
  const { name, email, picture } = userMetadata

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-tbhd11g52ckde1t1.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const user_metadata = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
      console.log('META:', userMetadata)
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub, user]);


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <button onClick={() => logout({ logoutParams: { returnTo: "http://localhost:3000/" } })}>
          Log Out
        </button>
        <img src={picture} alt={name} />
        <h2>Hi, {name}!</h2>
        <p>Email: {email}</p>
      </div>
    )
  )
}

export default Dashboard
