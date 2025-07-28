import './App.css';
import MovieCard from './components/MovieCard';

function App() {

  return (
    <>
      <MovieCard movie={{title: "Cars movie", release_date: "2006"}}/>
      <MovieCard movie={{title: "Cars movie", release_date: "2006"}}/>
    </>
  );
}


export default App