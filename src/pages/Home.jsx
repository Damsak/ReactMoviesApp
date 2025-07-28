import MovieCard from "../components/MovieCard";
import {useState} from "react";

function Home() {

    const [searchQuery, setSearchQuery] = useState(""); // to persist store search input, stays same when rerendering

    const movies = [
        {id:1, title: "Cars movie", release_date: "2006"},
        {id:2, title: "Joe's Film", release_date: "2024"},
        {id:3, title: "The Avengers", release_date: "2012"},
        {id:4, title: "Inception", release_date: "2010"}];


    const handleSearch = (e) => {
        e.preventDefault(); //prevent page from reloading
        alert(searchQuery)
        setSearchQuery(""); //clear search input after submitting
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

        <div className="movie-grid">
            {movies.map(
                (movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        </div>
    );
}

export default Home;