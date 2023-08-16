import { Link } from "react-router-dom"
import { useState } from "react"
import "./Navbar.css"
import Search from "./Search"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Navbar = () => {

  const [active, setActive] = useState("1")

  const handleClick = (event) => {
    setActive(event.target.id);

  }

  const {isAuthenticated, logout} = useAuth0();

  return (
    <nav className="navbar">
      <div className="inner-navbar">
        <h2>
          <Link to={'/'} id="1" onClick={handleClick}>Stars Dashboard</Link>
        </h2>
        {active === "2" || active === "3" ? <Search id={active}/> : ""}
        <ul>
          <li><Link to={'/'} className={active === "1" ? "btn active" : "btn"} id="1" onClick={handleClick}>Home</Link></li>
          <li><Link to={'/movies'} className={active === "2" ? "btn active" : "btn"} id="2" onClick={handleClick}>Movies</Link></li>
          <li><Link to={'/actors'} className={active === "3" ? "btn active" : "btn"} id="3" onClick={handleClick}>Actors</Link></li>
          <li>{ isAuthenticated && (<Link className="btn btn-logout" onClick={() => {logout({ returnTo: window.location.origin });}}>Log out</Link>) }</li>
        </ul>
      </div>
    </nav>
  )
}

export default withAuthenticationRequired( Navbar );