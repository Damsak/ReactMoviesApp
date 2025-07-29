import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {

  const { favorites } = useMovieContext(); // get favorites from context

  if (favorites) {
    return (
    
      <div className="favorites">
        <h2> Your Favorites</h2>
    <div className="movie-grid">
            {favorites.map(
                (movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
      </div>
    )
  }

  return <div className="favourites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start Adding Movies to your favourites</p>
    </div>
}

export default Favorites;