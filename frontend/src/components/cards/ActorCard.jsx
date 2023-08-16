import { Link } from "react-router-dom";
import "./ActorCard.css"

const ActorCard = ({ actor }) => {
    return (
        <div className="actors" key={actor.id}>
            <Link to={`/actor/${actor.id}`}>
                <img src={actor.image_link} alt={actor.name} />
                <h3>{actor.name}</h3>
            </Link>
        </div>
    );
};

export default ActorCard