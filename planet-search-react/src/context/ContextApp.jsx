// A funcionalidade do createContext está em passar dados de
// componentes pais para componentes filhos de forma direta,
// sem precisar fazer isso em cascata, do avô pro pai e depois
// do pai pro filho. Com o context você consegue passar diretamente
// do componente avô, ou tataravô e etc, pro filho.
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/FetchPlanets';

export const contextApp = createContext();

// A funcao PlanetProvider irá prover os componentes filhos
// com os dados recebidos da requisicao da API
export function PlanetProvider({ children }) {
  // planetData ira receber os dados da API externa
  // e para isso a funcao setPlanetData irá agir
  // recebendo como parametro os dados da API
  const [planetData, setPlanetData] = useState([]);
  // useState para filtragem de planetas do Form
  const [filteredPlanet, setFilteredPlanet] = useState([]);
  // criando os estados de filtros diversos
  const [filters, setFilters] = useState([]);

  // Estamos passando os dados do fetch da API para a funcao
  // do useState: setPlanetData
  useEffect(() => {
    const fetchPlanetsData = async () => {
      const dataFinal = await fetchPlanets();
      setPlanetData(dataFinal);
      setFilteredPlanet(dataFinal);
    };
    fetchPlanetsData();
  }, []);

  return (
    <contextApp.Provider
      value={ { planetData,
        filteredPlanet,
        setFilteredPlanet,
        filters,
        setFilters } }
    >
      {children}
    </contextApp.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
