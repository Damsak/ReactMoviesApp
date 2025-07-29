import MovieCard from "../components/MovieCard";
import {useState, useEffect} from "react";
import { searchMovies,getPopularMovies } from "../services/api";
import '../css/Home.css';

function Home() {

    const [searchQuery, setSearchQuery] = useState(""); // to persist store search input, stays same when rerendering

    //useeffect allow to add side effects to functions or components and define what to do when the component mounts or updates
    const [movies, setMovies] = useState([]); // to store movies fetched from API
    const [error, setError] = useState(null); // to handle errors
    const [loading, setLoading] = useState(true); // to handle loading state

    // () => {} is the function we want to run when the dependency array [] changes
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies(); // fetch popular movies
                setMovies(popularMovies); // update state with fetched movies
            } catch (error) {
                console.log(error)
                setError("Failed to load popular movies"); // handle error
            }
            finally {
                setLoading(false); // set loading to false after fetching
            }
        };

        loadPopularMovies(); // call the function to fetch movies


    }, []); // empty array means this effect runs only once when the component mounts

    const handleSearch = async (e) => {
        e.preventDefault(); //prevent page from reloading
        
        if(!searchQuery.trim()) return; // if search query is empty, do nothing

        if(loading) return; // if already loading, do nothing    

        setLoading(true); // set loading to true before fetching
        try {
            const searchResults = await searchMovies(searchQuery); // fetch movies based on search query
            setMovies(searchResults); // update state with search results
            setError(null); // reset error state
        } catch (error) {
            console.log(error);
            setError("Failed to search movies"); // handle error
        } finally {
            setLoading(false); // set loading to false after fetching
        }   

    };
        
    return (
    <div className="home">

        <form onSubmit={handleSearch} className="search-form">
            <input 
            type="text" 
            placeholder="Search for a movie..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} //update search everytime we type
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>} {/* display error if exists */}
        {loading ? <div className="loading">Loading...</div> : <div className="movie-grid">
            {movies.map(
                (movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>}

        </div>
    );
}

export default Home;