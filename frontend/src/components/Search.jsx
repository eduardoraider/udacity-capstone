import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import "./Search.css"

const Search = ({ id }) => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    let search_type = id === "2" ? "movies" : "actors";

    const handleSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!search) return;

        navigate(`/search?type=${search_type}&q=${search}`, { replace: true });

        setSearch("");
        document.getElementById("search-field").value = "";

    }

    return (
        <div className="search-box">
            <form onSubmit={handleSearch}>
                <input id="search-field" type="text" required placeholder={id === "2" ? "Search Movie" : "Search Actor"} onChange={(e) => setSearch(e.target.value)}
                    value={search} /><FaSearch id={id} onClick={handleSearch} />
            </form>
        </div>
    )

}

export default Search