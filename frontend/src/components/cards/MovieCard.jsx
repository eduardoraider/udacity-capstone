import { Link } from "react-router-dom";
import "./MovieCard.css"

const MovieCard = ({ movie }) => {
    return (
        <div className="movies">
            <Link to={`/movie/${movie.id}`}>
                <img src={movie.image_link} alt={movie.title} />
                <h3>{movie.title}</h3>
            </Link>
        </div>
    );
};

export default MovieCard