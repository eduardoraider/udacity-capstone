import castingFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./New-Actor.css"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../../components/Loading";

const NewActor = () => {

    const navigate = useNavigate()

    const [name, setActorName] = useState("");
    const [birthdate, setActorBirthdate] = useState(new Date());
    const [gender, setActorGender] = useState();
    const [image, setActorImage] = useState("");

    const { isLoading, getAccessTokenSilently, error } = useAuth0();

    if (error) {
      return <div>Oops... {error.message}</div>;
    }
  
    if (isLoading) {
      return <Loading />;
    }

    const createActor = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const actor = {name, birthdate, gender, image};

        const accessToken = await getAccessTokenSilently();

        const response = await castingFetch.post('/actors/create', actor, {
             headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        }).then( data => {
                navigate(`/actors/`, { replace: true });
        });
    }

    useEffect(() => {

        window.scrollTo(0, 0)

    }, [])

    return (
        <div className="main">
            <div className="header"><h1>Add new actor to casting</h1></div>
            <div >
                <form onSubmit={createActor}>
                    <div className="form-control">
                        <label htmlFor="actor-name">Actor name</label>
                        <input id="actor-name" type="text" name="actor-name" placeholder="Actor name" onChange={(e) => setActorName(e.target.value)} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="actor-birthdate">Birth date</label>
                        <input id="actor-birthdate" type="date" name="actor-birthdate" placeholder="Birth date" onChange={(e) => setActorBirthdate(e.target.value)} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="actor-gender">Actor gender</label>
                        <select id="actor-gender" name="actor-gender" onChange={(e) => setActorGender(e.target.value)} required>
                            <option value="3">ND</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="actor-image">Actor image link</label>
                        <input id="actor-image" type="text" name="actor-image" placeholder="url link" onChange={(e) => setActorImage(e.target.value)} required/>
                    </div>
                    <button className="btn btn-save" type="submit">Save New Actor</button>
                </form>
            </div>
        </div>
    )
}

export default withAuthenticationRequired(NewActor, {
    onRedirecting: () => <Loading />
  });