import "../css/MovieCard.css";  
import { useMovieContext } from "../contexts/MovieContext";


function MovieCard({movie}) {

    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault(); // prevent default action of the button
        if (favorite) {
            removeFromFavorites(movie.id); // if already favorite, remove it
        }
        else {
            addToFavorites(movie); // if not favorite, add it to favorites
        }       
    }

    return <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-overlay"> 
                    <button className=  {`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        🤍
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
}

export default MovieCard;