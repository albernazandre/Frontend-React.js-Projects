// componente que cria botao de excluir todos ou alguns filtros e retornar o que era antes

import { useContext } from 'react';
import { contextApp } from '../context/ContextApp';

export default function Filters() {
  const { filters, setFilters,
    setFilteredPlanet, planetData } = useContext(contextApp);

  const handleClick = (filtered) => {
    const freshFilters = filters.filter((noMoreFilter) => noMoreFilter !== filtered);
    if (freshFilters.length > 0) {
      setFilters(freshFilters);
      const filterData = planetData.filter((planet) => freshFilters
        .some(({ valueColumn, valueOperator, valueInput }) => {
          if (planet[valueColumn] !== 'unknown') {
            switch (valueOperator) {
            case 'maior que':
              return planet[valueColumn] > valueInput;
            case 'menor que':
              return planet[valueColumn] < valueInput;
            case 'igual a':
              return planet[valueColumn] === valueInput;
            default:
              return true;
            }
          } else {
            return true;
          }
        }));
      setFilteredPlanet(filterData);
    } else {
      setFilters([]);
      setFilteredPlanet(planetData);
    }
  };
  return (
    <div>
      {filters.map((f) => (
        <div key={ f.valueColumn } data-testid="filter">
          { `${f.valueColumn} ${f.valueOperator} ${f.valueInput}` }
          <button onClick={ () => handleClick(f) }>Exclude</button>
        </div>
      ))}
    </div>
  );
}
