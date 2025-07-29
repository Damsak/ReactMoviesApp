import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

//provide state to any components that wrapped inside. allows them to hook into the context and access the state
//children- anything that is wrapped inside the provider
export const MovieProvider = ({children}) => {

    const [favorites, setFavorites] = useState([]); // to store favorite movies

    //local storage
    useEffect(() => {
        
        const storedFavs = localStorage.getItem("favorites");

        if(storedFavs) setFavorites(JSON.parse(storedFavs)) // parse the stored favorites from local storage

        }, []) 

    //anytime the fav stage changes we update the local storage
    //this effect runs whenever the favorites change, ensuring that the local storage is always in sync
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites)); // store favorites in local storage
    }, [favorites]); // run this effect whenever favorites change



    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]) //take the previous favorites and add the new movie to the end of the arra
    };

    //genetrate new array of favorites without the movie that is being removed
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId)) // filter out the
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId) // check if the movie is already
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    //anything inside can access all values inside the value object
    return <MovieContext.Provider value = {value}> 
        {children}
    </MovieContext.Provider>

}