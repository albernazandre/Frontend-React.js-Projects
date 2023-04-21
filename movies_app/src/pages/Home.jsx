import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
    // console.log(moviesURL, apiKey); => test

  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
        
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data);
    setTopMovies(data.results);
  };

  useEffect(() => {
      
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    // console.log(topRatedUrl) => test

    getTopRatedMovies(topRatedUrl);

  }, []);

  return (
    <div className="container">
      <h2 className="title">Best Films:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Loading...</p>}
        {topMovies.length > 0 && topMovies.map((movie) =>
          <MovieCard key={movie.id} movie={movie} />)}
      </div>       
    </div>
  );
};
  
  export default Home;
  