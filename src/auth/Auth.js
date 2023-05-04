import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Alert from '@mui/material/Alert';
import axios from 'axios';


const onError = (error) => {
  return <Alert severity="error">{error}</Alert>
}

const useAuth = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('')
  const domain = "dev-tbhd11g52ckde1t1.us.auth0.com";

  useEffect(() => {
    const getUserMetadata = async () => {

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });
        setAccessToken(accessToken)
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
        setLoading(false);
      }
    };

    getUserMetadata()
  }, [getAccessTokenSilently, user?.sub, user]);

  const editUserName = async (name) => {
    console.log('Editing user name');

    const axios = require('axios')

    const options = {
      method: 'PATCH',
      url: `https://${domain}/api/v2/users/user_id`,
      headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
      data: { user_metadata: { name: name } }
    };

    try {
      const response = await axios(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    userMetadata,
    editUserName,
    loading
  }
}

export { useAuth }
