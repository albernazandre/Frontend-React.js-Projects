import React from 'react';
import PropTypes from 'prop-types';

// Criando o componenete PlanetCard
class PlanetCard extends React.Component {
  render() { // imagens e nome dos planetas render
    const { planetName, planetImage } = this.props;
    return (
      <div data-testid="planet-card">
        <p data-testid="planet-name">{ planetName }</p>
        <img src={ planetImage } alt={ `Planeta ${planetName}` } />
      </div>
    );
  }
}

PlanetCard.propTypes = {
  planetName: PropTypes.string.isRequired, // tipo string e obrigatorio
  planetImage: PropTypes.string.isRequired, // URL
};

export default PlanetCard;
