import { useState, useEffect } from "react"
// useSearchParams permite pegar a query string (?q=) da url
// e utilizar para resgatar os dados da API
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
        
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data);
    setMovies(data.results);
  };

  useEffect(() => {
      
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
    // console.log(searchWithQueryURL) => test

    getSearchedMovies(searchWithQueryURL);
  // no final colocamos esse query pra ser um gatilho para que o 
  // useEffect execute mais uma vez a busca pelo search
  }, [query])

  return (
    <div>
      <div className="container">
      <h2 
        className="title">
        Results to: <span className="query-text">
        {query}
        </span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Loading...</p>}
        {movies.length > 0 && movies.map((movie) =>
          <MovieCard key={movie.id} movie={movie} />)}
      </div>
        
    </div>
    </div>
  )
}
  
export default Search
  