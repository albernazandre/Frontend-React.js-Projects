// O outlet faz com que seja possivel visualizar o conteudo da pagina que clicamos
// através dos links

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App;
