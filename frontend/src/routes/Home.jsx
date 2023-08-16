import castingFetch from "../axios/config"
import { useState, useEffect } from "react"
import "./Home.css"
import MovieCard from "../components/cards/MovieCard"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../components/Loading";
import Login from '../routes/Login'


const Home = () => {

    const { user, isLoading, getAccessTokenSilently, error } = useAuth0();
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
       
      try {

          const accessToken = await getAccessTokenSilently();
          
          const response = await castingFetch.get('/movies', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          const data = response.data.movies;

          setMovies(data);

        } catch (error) {
          console.log(error);
        }
    };

 
    useEffect(() => {

      getMovies();

    }, []);


    if (isLoading) {
        return <Loading />;
    }


    return (
        <div className="main">
            <div className="header"><h1>Welcome back, {user.name} </h1>
            <h2>{user.casting_position}</h2>
            </div>
            <div className="content">
                {movies.length === 0 ? <p>Loading...</p> : (
                    movies.map((movie) => 
                    <MovieCard key={movie.id} movie={movie} />
                    )
                )}
            </div>
        </div>
    )
}

export default withAuthenticationRequired(Home, {
    onRedirecting: () => <Login />
  });