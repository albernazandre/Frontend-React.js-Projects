// Adendos:
// movie.poster_path captura o id da imagem de capa do filme que ira complementar a url de imagem
// A rota movie/id está lá nas rotas

import { Link } from "react-router-dom";

import {FaStar} from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <img src={imageUrl + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Details</Link>}
    </div>
  )
}

export default MovieCard;
