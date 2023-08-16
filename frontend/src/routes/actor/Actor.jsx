import castingFetch from "../../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import MovieCardMini from "../../components/cards/MovieCardMini"
import "./Actor.css"
import { BsDot } from "react-icons/bs"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../../components/Loading";

const Actor = () => {

    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const navigate = useNavigate();

    const { user, isLoading, getAccessTokenSilently, error } = useAuth0();

    if (error) {
      return <div>Oops... {error.message}</div>;
    }
  
    if (isLoading) {
      return <Loading />;
    }

    const getActor = async (url) => {

        try {

          const accessToken = await getAccessTokenSilently();
          
          const response = await castingFetch.get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const data = response.data.actor;
    
          setActor(data);
    
        } catch (error) {
          console.log(error)
        }

      }
    
      useEffect(() => {

        window.scrollTo(0, 0)

        const actorURL = `/actors/${id}`;
    
        getActor(actorURL);
    
      }, []);


      const editActor = (event) => {

        event.currentTarget.classList.toggle('active');

        let edit_box = document.querySelector(".section-edit-actor");
        edit_box.classList.toggle("show");

      }

      function _calculateAge(birthday) {
        console.log(birthday);
        let diff = Date.parse(Date()) - Date.parse(birthday);
        let born = new Date();
        born.setTime(diff);
        let ageYears = born.getFullYear() - 1970;
        document.querySelector(".actor-age").innerText = `${ageYears} years`;
      }

      function _formatDate(birthday) {
        const date = new Date(birthday+"T00:00:00");
        let born = date.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'});
        document.querySelector(".actor-born").innerText = `${born}`;
      }

      function handleChange(e) {
        setActor({ ...actor, [e.target.name]: e.target.value });
      }

      function handleBirthdate(e) {
        setActor({ ...actor, [e.target.name]: e.target.value });
        _calculateAge(e.target.value);
        _formatDate(e.target.value);
      }

      const updateActor = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let name = actor.name;
        let birthdate = actor.birthdate;
        let gender = actor.gender;
        let image = actor.image_link;

        let update_actor = {name, birthdate, gender, image};

        const accessToken = await getAccessTokenSilently();

        const response = await castingFetch.patch(`/actors/${id}/edit`, update_actor, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then(data => {

          window.scrollTo(0, 0);

          let btn = document.querySelector(".btn.btn-action");
          btn.classList.toggle('active');

          let edit_box = document.querySelector(".section-edit-actor");
          edit_box.classList.toggle("show");
  
        });
    }


    const openModal = (e) => {
      document.getElementById('delete-modal').style.display='block';
    }

    const closeModal = (e) => {
      document.getElementById('delete-modal').style.display='none'
    }

    const deleteActor = async (e) => {

      const accessToken = await getAccessTokenSilently();

      const response = await castingFetch.delete(`/actors/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(data => {
        document.getElementById('delete-modal').style.display = 'none'
        navigate(`/actors`, { replace: true });
      });


    }

    return (
      <div className="main">
        {actor === null ? <p>Loading...</p> : (<div>
          <div className="header-single-page"><h1>{actor.name}</h1>{user.casting_role === 'producer' || user.casting_role === 'director' ? <div className="btn-section"><button className="btn btn-delete" onClick={openModal}>Delete Actor</button><button className="btn btn-action" onClick={editActor}>Edit Actor</button></div> : ''}</div>
          <div className="body-single-page">
            <div>
              <div className="subheader-single-page"><h3>Born <span className="text actor-born">{actor.born}</span></h3> <span className="separator-dot">< BsDot /></span> <h3>Age <span className="text actor-age">{actor.age} years</span></h3></div>
              <img className="actor-photo" src={actor.image_link} alt={actor.name} />
            </div>
            <div>
            <div className="section-edit-actor">
                <form onSubmit={updateActor}>
                    <div className="form-control">
                        <label htmlFor="name">Actor name</label>
                        <input id="name" type="text" name="name" placeholder="Actor name" onChange={handleChange} value={actor.name} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="birthdate">Birth date</label>
                        <input id="birthdate" type="date" name="birthdate" placeholder="Birth date" onChange={handleBirthdate} value={actor.birthdate} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="gender">Actor gender</label>
                        <select id="actor-gender" name="gender" onChange={handleChange} value={actor.gender} required>
                            <option value="3">ND</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="image_link">Actor image link</label>
                        <input id="image_link" type="text" name="image_link" placeholder="url link" onChange={handleChange} value={actor.image_link} required/>
                    </div>
                    <button className="btn btn-save" type="submit">Save</button>
                </form>
            </div>
            </div>
          </div>
          <div className="section-title">Movies</div>
          <div className="content details">
            {actor.movies.length === 0 ? "" : (
              actor.movies.map((movie) =>
                <MovieCardMini key={movie.movie_id} movie={movie} />
              )
            )}
          </div>
          <div id="delete-modal" className="modal">
            
            <div className="modal-content">
              <div className="container">
                <span onClick={closeModal} className="close"
              title="Close Modal">×</span>
                <h1>Delete Confirmation</h1>
                <p>Are you sure you want to delete {actor.name}?</p>

                <div className="clearfix">
                  <button type="button" onClick={closeModal}
                    className="cancelbtn">Cancel</button>
                  <button type="button" onClick={deleteActor}
                    className="deletebtn">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    )
}

export default withAuthenticationRequired(Actor, {
  onRedirecting: () => <Loading />
});