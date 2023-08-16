import castingFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MovieCard from "../../components/cards/MovieCard"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../../components/Loading";

const Movies = () => {

  const [movies, setMovies] = useState([])

  const { user, isLoading, getAccessTokenSilently, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

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
      console.log(error)
    }
  }

  useEffect(() => {

    window.scrollTo(0, 0)

    getMovies();

  }, [])

  return (
    <div className="main">
      <div className="actionbar">{user.casting_role === 'producer' ? <Link to={"/new-movie"} className="btn btn-action">Add New Movie</Link> : '' }</div>
      <div className="content">
        {movies.length === 0 ? <p>Loading...</p> : (
          movies.slice(0).reverse().map((movie) =>
            <MovieCard key={movie.id} movie={movie} />
          )
        )}
      </div>
    </div>
  )
}

export default withAuthenticationRequired(Movies, {
  onRedirecting: () => <Loading />
});