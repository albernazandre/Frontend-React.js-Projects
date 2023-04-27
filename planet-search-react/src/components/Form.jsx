// formulario de filtro dos planetas

import { useContext, useRef } from 'react';
import { contextApp } from '../context/ContextApp';
import Filters from './Filter';

export default function Form() {
  // O useRef é um gancho que permite criar diretamente uma referência
  // ao elemento DOM no componente funcional
  const planet = useRef(null); // valor inicial do estado é nulo
  const column = useRef(null);
  const operator = useRef(null);
  const value = useRef(null);

  const {
    filteredPlanet,
    planetData,
    setFilteredPlanet,
    filters,
    setFilters,
  } = useContext(contextApp);

  // funcao que faz a filtragem dos planetas a partir do texto
  // colocado no filtro
  const handleFilterPlanet = () => {
    const planData = planetData
      .filter((plan) => plan.name.includes(planet.current.value));
    setFilteredPlanet(planData);
  };

  // funcao que ativa os filtros
  // consiste em filtrar valores igual, menor ou maior que o numeral passado como
  // parametro para por exemplo, diameter, orbital period, population, etc...
  const handleFilterAll = (event) => {
    event.preventDefault();
    const valueColumn = column.current.value;
    const valueOperator = operator.current.value;
    const valueInput = Number(value.current.value);
    setFilters([...filters, { valueColumn, valueOperator, valueInput }]);
    let myFilter;
    if (valueOperator === 'igual a') {
      myFilter = filteredPlanet
        .filter((planeta) => Number(planeta[valueColumn]) === valueInput);
    } else if (valueOperator === 'menor que') {
      myFilter = filteredPlanet.filter((planeta) => planeta[valueColumn] < valueInput);
    } else {
      myFilter = filteredPlanet.filter((planeta) => planeta[valueColumn] > valueInput);
    }
    setFilteredPlanet(myFilter);
  };

  const allFilterRemoved = (event) => {
    event.preventDefault();
    setFilters([]);
    setFilteredPlanet(planetData);
  };

  // funcao que carrega filtros selecionados
  // exemplo: criei um filtro de populacao e outro de diametro do planeta
  // veremos os dois filtro serem carregados e os resultados virao destes dois filtros selecionados
  const filtersInColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const orderOfColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const onlyFilters = filtersInColumn
    .filter((filteredColumn) => !filters
      .some((f) => f.valueColumn.includes(filteredColumn)))
    .map((columnOptions) => (
      <option key={ columnOptions } value={ columnOptions }>
        {columnOptions}
      </option>
    ));

  return (
    <form onSubmit={ (event) => event.preventDefault() }>
      <div>
        <input
          type="text"
          ref={ planet }
          onChange={ handleFilterPlanet }
          data-testid="name-filter"
        />
      </div>
      <div>
        <label>
          Column
          <select data-testid="column-filter" ref={ column }>
            {onlyFilters}
          </select>
        </label>
        <label>
          Operator
          <select data-testid="comparison-filter" ref={ operator }>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input type="number" data-testid="value-filter" ref={ value } defaultValue="0" />
        <button
          onClick={ handleFilterAll }
          data-testid="button-filter"
        >
          FILTER
        </button>
        <button
          onClick={ allFilterRemoved }
          data-testid="button-remove-filters"
        >
          FILTER REMOVE
        </button>
        <div>
          <label htmlFor="">
            Put in Order
            <select data-testid="column-sort">
              {orderOfColumn.map((orderValue) => (
                <option
                  value={ orderValue }
                  key={ orderValue }
                >
                  {orderValue}
                </option>
              ))}
            </select>
          </label>
          Descendent
          <input
            type="radio"
            value="DESC"
            name="order"
            id="ASC"
            data-testid="column-sort-input-asc"
          />
          Ascendent
          <input
            type="radio"
            value="DESC"
            name="order"
            id="DESC"
            data-testid="column-sort-input-desc"
          />
        </div>
      </div>
      {filters && <Filters />}
    </form>
  );
}
