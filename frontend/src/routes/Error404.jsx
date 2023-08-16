import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../components/Loading";

const Error404 = () => {

    return (
        <div>
            <h1>Page not found!</h1>
        </div>
    )
}

export default withAuthenticationRequired(Error404, {
    onRedirecting: () => <Loading />
  });