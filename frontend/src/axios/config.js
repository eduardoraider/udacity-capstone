import axios from "axios"

const base_url = import.meta.env.VITE_REACT_APP_BASE_URL;

const castingFetch = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
});

export default castingFetch;