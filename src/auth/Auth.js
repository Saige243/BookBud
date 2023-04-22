import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Alert from '@mui/material/Alert';

const onError = (error) => {
  return <Alert severity="error">{error}</Alert>
}

export function GetUserMetadata() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState({});

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
        onError(e.message)
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub, user]);

  return userMetadata
}
