import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

// Pages
import Home from './routes/Home'
import Login from './routes/Login'
import Movies from './routes/movie/Movies'
import Movie from './routes/movie/Movie'
import NewMovie from './routes/movie/New-Movie'
import Actors from './routes/actor/Actors'
import Actor from './routes/actor/Actor'
import NewActor from './routes/actor/New-Actor'
import Search from './routes/Search'
import Error404 from './routes/Error404'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: "/movies/",
        element: <Movies />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
      {
        path: "/new-movie/",
        element: <NewMovie />,
      },
      {
        path: "/actors/",
        element: <Actors />,
      },
      {
        path: "/actor/:id",
        element: <Actor />,
      },
      {
        path: "/new-actor/",
        element: <NewActor />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/*",
        element: <Error404 />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0ProviderWithHistory>
      <RouterProvider router={router} />
    </Auth0ProviderWithHistory>
)
