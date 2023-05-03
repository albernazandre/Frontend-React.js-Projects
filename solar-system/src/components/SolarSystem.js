import React from 'react';
import Title from './Title';
import Planets from '../data/planets';
import PlanetCard from './PlanetCard';

// Criando o componenete Header
class SolarSystem extends React.Component {
  render() {
    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        { Planets.map((plan) => ( // renderizaremos um component planetCard para cada planeta
          <PlanetCard
            planetName={ plan.name }
            planetImage={ plan.image }
            key={ plan.name }
          />
        ))}
      </div>
    );
  }
}
// exportando o componente para ser reutilizado no codigo
export default SolarSystem;
