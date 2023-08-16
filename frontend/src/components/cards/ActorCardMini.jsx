import { Link } from "react-router-dom";
import "./ActorCard.css"
import { BsXCircleFill } from "react-icons/bs"

const ActorCardMini = ({ actor, removeActor, role }) => {
    return (
        <div className="mini actors">
            <Link to={`/actor/${actor.actor_id}`}>
                <img src={actor.image_link} alt={actor.actor_name} />
                <h4>{actor.actor_name}</h4>
            </Link>
            {role === 'producer' || role === 'director' ? <div className="mini-button">
                < BsXCircleFill id={actor.id} data-name={actor.actor_name} onClick={removeActor} />
            </div> : ''}
        </div>
    );
};

export default ActorCardMini