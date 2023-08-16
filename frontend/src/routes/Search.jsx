import castingFetch from "../axios/config"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import "./Search.css"
import MovieCard from "../components/cards/MovieCard"
import ActorCard from "../components/cards/ActorCard"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "../components/Loading";

const Search = () => {

    const { getAccessTokenSilently } = useAuth0();

    const [searchParams] = useSearchParams();

    const [results, setResult] = useState([]);
    const query_term = searchParams.get("q");
    const query_type = searchParams.get("type");

    const getSearch = async (url, query_term) => {

        try {

            const accessToken = await getAccessTokenSilently();

            const response = await castingFetch.post(url, {
                search_term: query_term,
            },{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
            });

            const data = query_type === "movies" ? response.data.movies : response.data.actors;

            setResult(data);

            window.scrollTo(0, 0)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const searchURL = `/${query_type}/search`;

        getSearch(searchURL, query_term);


    }, [query_type, query_term])

    return (
        <div className="main">
            <div className="header"><h1>Search results for: <span className="query-term">{query_term}</span></h1></div>
            <div className="content">
                {results.length === 0 ? <p>{query_type === "movies" ? "Movie not found" : "Actor not found"}</p> : (
                    results.map((result) =>
                    query_type === "movies" ? <MovieCard key={result.id} movie={result} /> :
                    <ActorCard key={result.id} actor={result} />
                    )
                )}
            </div>
        </div>
    )
}

export default withAuthenticationRequired(Search, {
    onRedirecting: () => <Loading />
  });