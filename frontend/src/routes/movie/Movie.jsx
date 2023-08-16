import castingFetch from "../../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ActorCardMini from "../../components/cards/ActorCardMini"
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./Movie.css"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../../components/Loading";

const Movie = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [options, setOptions] = useState();
  const [deleteOption, setDelete] = useState("movie")
  const animatedComponents = makeAnimated();
  const [deleteActor, setDeleteActor] = useState();
  const [allActors, setAllActors] = useState();

  const { user, isLoading, getAccessTokenSilently, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const getMovie = async (url) => {

    try {

      const accessToken = await getAccessTokenSilently();

      const response = await castingFetch.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data.movie;

      setMovie(data);

    } catch (error) {
      console.log(error)
    }

  }

  function removeObjects(array, values) {
    return array.filter(obj => !values.includes(obj.id));
  }

  const getListActors = async () => {


    try {

      const accessToken = await getAccessTokenSilently();

      const actors_list = await castingFetch.get("/actors", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      let data_actors = actors_list.data.actors;

      data_actors.sort((a, b) => a.name.localeCompare(b.name));

      setAllActors(data_actors);

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    window.scrollTo(0, 0)

    const movieURL = `/movies/${id}`;

    getMovie(movieURL);

    getListActors();

  }, []);

  const editMovie = (event) => {
    document.querySelector(".btn.action-casting").classList.remove("active");
    document.querySelector(".section-select-casting").classList.remove("show");

    event.currentTarget.classList.toggle('active');

    let edit_box = document.querySelector(".section-edit-movie");
    edit_box.classList.toggle("show");

  }

  function _formatDate(release) {
    const date = new Date(release + "T00:00:00");
    let release_date = date.toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' });
    document.querySelector(".release-date").innerText = `${release_date}`;
  }

  function _clearButons() {
    document.querySelector(".btn.action-casting").classList.remove("active");
    document.querySelector(".section-select-casting").classList.remove("show");
    document.querySelector(".btn.action-edit").classList.remove("active");
    document.querySelector(".section-edit-movie").classList.remove("show");
  }

  function handleChange(e) {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  }

  function handleReleaseDate(e) {
    setActor({ ...movie, [e.target.name]: e.target.value });
    _formatDate(e.target.value);
  }

  const updateMovie = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let title = movie.title;
    let date = movie.release_date;
    let image = movie.image_link;

    let update_movie = { title, date, image };

    const accessToken = await getAccessTokenSilently();

    const response = await castingFetch.patch(`/movies/${id}/edit`, update_movie, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(data => {

      window.scrollTo(0, 0);

      let btn = document.querySelector(".btn.btn-action");
      btn.classList.toggle('active');

      let edit_box = document.querySelector(".section-edit-movie");
      edit_box.classList.toggle("show");

    });
  }

  const openModal = (e) => {
    _clearButons();
    setDelete("movie");
    document.getElementById('delete-modal').style.display = 'block';
  }

  const closeModal = (e) => {
    document.getElementById('delete-modal').style.display = 'none';
  }

  const deleteMovie = async (e) => {

    const accessToken = await getAccessTokenSilently();

    const response = await castingFetch.delete(`/movies/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(data => {
      document.getElementById('delete-modal').style.display = 'none'
      navigate(`/movies`, { replace: true });
    });

  }

  function loadOptions() {

    setSelectedOptions("");
    setOptions("");

    let options_list = []

    let removeActorsOnCasting = [];

    movie.actors.forEach(actor => {
      removeActorsOnCasting.push(actor.actor_id);
    });

    const result = removeObjects(allActors, removeActorsOnCasting);

    result.forEach(actor => {
      options_list.push({ "actor_id": actor.id, "value": actor.id, "label": actor.name })

    });

    setOptions(options_list);

  }

  const selectCasting = async (event) => {

    loadOptions();

    document.querySelector(".btn.action-edit").classList.remove("active");
    document.querySelector(".section-edit-movie").classList.remove("show");

    event.currentTarget.classList.toggle('active');

    let casting_box = document.querySelector(".section-select-casting");
    casting_box.classList.toggle("show");

  }

  const handleSelectActors = async (e) => {

    let action_casting = document.querySelector(".btn.action-casting");
    action_casting .classList.toggle('active');

    let casting_box = document.querySelector(".section-select-casting");
    casting_box.classList.toggle("show");

    let ids = selectedOptions.map(({ value }) => value);

    let casting_ids = JSON.stringify(ids);

    let form_data = new FormData();
    form_data.append("movie_id", id);
    form_data.append("casting_ids", casting_ids);

    const accessToken = await getAccessTokenSilently();

    const response = await castingFetch.post('/casting', form_data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }});

      const movieURL = `/movies/${id}`;
      getMovie(movieURL);    

  }

  const openModalCasting = (e) => {
    _clearButons();
    window.scrollTo(0, 0);
    setDelete("actor");
    setDeleteActor({ "id": e.currentTarget.id, "name": e.currentTarget.dataset.name });
    document.getElementById('delete-modal').style.display = 'block';

  }

  const removeActor = async (e) => {

    document.getElementById('delete-modal').style.display = 'none';

    const accessToken = await getAccessTokenSilently();

    const response = await castingFetch.delete(`/casting/${deleteActor.id}/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(data => {
      window.scrollTo(0, 0)
      const movieURL = `/movies/${id}`;
      getMovie(movieURL);
    });


  }

    return (
      <div className="main">
        {movie === null ? <p>Loading...</p> : (<div>
          <div className="header-single-page"><h1>{movie.title}</h1><div className="btn-section">{user.casting_role === 'producer' ? <button className="btn action-delete btn-delete" onClick={openModal}>Delete Movie</button> : ''}{user.casting_role === 'producer' || user.casting_role === 'director' ? <button className="btn action-edit btn-action " onClick={editMovie}>Edit Movie</button> : ''}{user.casting_role === 'producer' || user.casting_role === 'director' ? <button className="btn action-casting btn-action" onClick={selectCasting}>Add Casting</button>: ''}</div></div>
          <div className="body-single-page">
            <div>
              <div className="subheader-single-page">
                <h3>Release date <span className="text release-date">{movie.release_date}</span></h3>
              </div>
              <img className="movie-image" src={movie.image_link} alt={movie.title} />
            </div>
            <div>
            <div className="section-edit-movie">
                <form onSubmit={updateMovie}>
                    <div className="form-control">
                        <label htmlFor="title">Movie title</label>
                        <input id="title" type="text" name="title" placeholder="Movie title" onChange={handleChange} value={movie.title} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="release_date">Release date</label>
                        <input id="release_date" type="date" name="release_date" placeholder="Release date" onChange={handleReleaseDate} value={movie.original_date} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="image_link">Movie image link</label>
                        <input id="image_link" type="text" name="image_link" placeholder="url link" onChange={handleChange} value={movie.image_link} required/>
                    </div>
                    <button className="btn btn-save" type="submit">Save</button>
                </form>
            </div>
              <div className="section-select-casting">
                <div className="form-control">
                  <label htmlFor="casting">Select one or multiple actors.</label>
                  <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? 'grey' : 'red',
                    }),
                  }}
                    components={animatedComponents}
                    value={selectedOptions || ''}
                    isMulti
                    options={options}
                    onChange={(item) => setSelectedOptions(item)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    classNames={{
                      control: (state) =>
                        state.isFocused ? 'border-red-600' : 'border-grey-300',
                    }}
                    isClearable={true}
                    isSearchable={true}
                    isDisabled={false}
                    isLoading={false}
                    isRtl={false}
                    closeMenuOnSelect={false}
                    placeholder="Select or search for an actor..."
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: '#f7b500'
                      },
                    })}
                  />
                </div>
                <button className="btn btn-save" onClick={handleSelectActors}>Add to Movie</button>
              </div>
            </div>
          </div>
          <div className="section-title">Casting</div>
          <div className="content details">
            {movie.actors.length === 0 ? "" : (
              movie.actors.map((actor) =>
                <ActorCardMini key={actor.actor_id} actor={actor} removeActor={openModalCasting} role={user.casting_role} />
              )
            )}
          </div>
          <div id="delete-modal" className="modal">
            
            <div className="modal-content">
              <div className="container">
                <span onClick={closeModal} className="close"
              title="Close Modal">×</span>
                <h1>{deleteOption === "movie" ? "Delete Confirmation" : "Remove Confirmation" }</h1>
                <p>{deleteOption === "movie" ? `Are you sure you want to delete the movie ${movie.title}` : `Are you sure you want to remove ${deleteActor.name} from the movie ${movie.title}?` } </p>
                <div className="clearfix">
                  <button type="button" onClick={closeModal}
                    className="cancelbtn">Cancel</button>
                  <button type="button" onClick={deleteOption === "movie" ? deleteMovie : removeActor}
                    className="deletebtn">{deleteOption === "movie" ? "Delete" : "Remove" }</button>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    )
}

export default withAuthenticationRequired(Movie, {
  onRedirecting: () => <Loading />
});