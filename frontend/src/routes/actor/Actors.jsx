import castingFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ActorCard from "../../components/cards/ActorCard"
import styles from "./Actors.module.css"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../../components/Loading";

const Actors = () => {
  const [actors, setActors] = useState([])
  const [original_actors, setOriginalActors] = useState([])

  const { user, isLoading, getAccessTokenSilently, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const getActors = async () => {

    try {

      const accessToken = await getAccessTokenSilently();

      const response = await castingFetch.get('/actors', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data.actors;

      setActors(data);

      setOriginalActors(data);

    } catch (error) {
      console.log(error)
    }
  }

  const changeList = (gender) => {

    if (gender == 0) {
      getActors();
    }

    const filterByGender = original_actors.filter((actor) => actor.gender == gender);

    setActors(filterByGender);

  }

  useEffect(() => {

    window.scrollTo(0, 0)

    getActors();

  }, [])


  return (
    <div className="main">
      <div className="actionbar"><span className="filter-by">Filter by</span>
        <select className={styles.select} onChange={(e) => changeList(e.target.value)}>
          <option value="" >Gender</option>
          <option value="0">All</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">ND</option>
        </select>
        {user.casting_role === 'producer' || user.casting_role === 'director' ? <Link to={"/new-actor"} className="btn btn-action">Add New Actor</Link> : ''}
      </div>
      <div className="content">
        {actors.length === 0 ? <p>Loading...</p> : (
          actors.slice(0).reverse().map((actor) =>
            <ActorCard key={actor.id} actor={actor} />
          )
        )}
      </div>
    </div>
  )
}

export default withAuthenticationRequired(Actors, {
  onRedirecting: () => <Loading />
});