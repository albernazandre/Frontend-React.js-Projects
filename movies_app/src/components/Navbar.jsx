import { useState } from "react";
// useNavigate é uma funcao de redirecionamento do componente
import { Link, useNavigate } from "react-router-dom";
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi";

import "./Navbar.css";

function Navbar() {
  // O onCheange no input faz com que quando alguem digita algo no input
  // o estado 'search' seja modificado
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(search);

    if(!search) return;

    // o '?q=' faz com que se envie "alguma coisa" para a query string
    // para que se pegue este valor que consulta a api e traz os
    // resultados de busca
    navigate(`/search?q=${search}`);
    setSearch("");
  }

  return (
    <div>
      <nav id="navbar">
        <h2>
          <Link to="/"><BiCameraMovie /> Movies</Link>
        </h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search movie" 
            onChange={(e) => setSearch(e.target.value)}
            value={search} // estado sera limpado quando state for limpo
          />
          <button type="submit">
            <BiSearchAlt2 />
          </button>
        </form>
      </nav>
    </div>
  )
}
  
  export default Navbar;
