import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      // hasTrunfo,
      prevTitle,
    } = this.props;

    return (
      <>
        <h3>{ prevTitle }</h3>
        <p data-testid="name-card">
          { cardName }
        </p>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <p data-testid="description-card">
          { cardDescription }
        </p>
        <p data-testid="attr1-card">
          { cardAttr1 }
        </p>
        <p data-testid="attr2-card">
          { cardAttr2 }
        </p>
        <p data-testid="attr3-card">
          { cardAttr3 }
        </p>
        <p data-testid="rare-card">
          { cardRare }
        </p>
        { cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p>}
      </> // se cardTrunfo existe, retorne 'p'
    );
  }
}
// valores tipificados pelo proptypes
Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  // hasTrunfo: PropTypes.bool.isRequired,
  prevTitle: PropTypes.string,
}.isRequired;

export default Card;
