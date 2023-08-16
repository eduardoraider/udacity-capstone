import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";


const myCustomClaims = {
  permissions: ['get', 'post', 'edit', 'delete'],
};

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
  const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE;
  const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={audience}
      onAccessTokenPayload={({ accessTokenPayload }) => {
        // Add custom claims to the access token payload
        return {
          ...accessTokenPayload,
          ...myCustomClaims
        };
      }}>
        {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;