import castingFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./New-Movies.css"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../../components/Loading";

const NewMovie = () => {

    const navigate = useNavigate()

    const [title, setMovieTitle] = useState("");
    const [image, setMovieImage] = useState("");
    const [date, setMovieDate] = useState(new Date());

    const { isLoading, getAccessTokenSilently, error } = useAuth0();

    if (error) {
      return <div>Oops... {error.message}</div>;
    }
  
    if (isLoading) {
      return <Loading />;
    }

    const createMovie = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const movie = {title, image, date};

        const accessToken = await getAccessTokenSilently();

        const response = await castingFetch.post('/movies/create', movie, {
           headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
        ).then( data => {
                navigate(`/movies/`, { replace: true });
        });
    }

    useEffect(() => {

        window.scrollTo(0, 0)

    }, [])

    return (
        <div className="main">
            <div className="header"><h1>Add new movie</h1></div>
            <div >
                <form onSubmit={createMovie}>
                    <div className="form-control">
                        <label htmlFor="movie-title">Movie title</label>
                        <input id="movie-title" type="text" name="movie-title" placeholder="Movie title" onChange={(e) => setMovieTitle(e.target.value)} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="release_date">Release date</label>
                        <input id="release_date" type="date" name="release_date" placeholder="Release date" onChange={(e) => setMovieDate(e.target.value)} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="movie-image">Movie image link</label>
                        <input id="movie-image" type="text" name="movie-image" placeholder="url link" onChange={(e) => setMovieImage(e.target.value)} required/>
                    </div>
                    <button className="btn btn-save" type="submit">Save New Movie</button>
                </form>
            </div>
        </div>
    )
}

export default withAuthenticationRequired(NewMovie, {
    onRedirecting: () => <Loading />
  });