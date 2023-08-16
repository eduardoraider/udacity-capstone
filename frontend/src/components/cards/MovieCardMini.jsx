import { Link } from "react-router-dom";
import "./MovieCard.css"

const MovieCardMini = ({ movie }) => {
    return (
        <div className="mini movies">
            <Link to={`/movie/${movie.movie_id}`}>
                <img src={movie.image_link} alt={movie.movie_title} />
                <h4>{movie.movie_title}</h4>
            </Link>
        </div>
    );
};

export default MovieCardMini