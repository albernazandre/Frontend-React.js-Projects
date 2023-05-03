import PropTypes from 'prop-types';
import React from 'react';

class Form extends React.Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <section>
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="name-input"
              id="name"
              type="text"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
              placeholder="Nome da carta"
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              type="textarea"
              name="cardDescription"
              value={ cardDescription }
              onChange={ onInputChange }
              placeholder="Descreva a carta"
            />
          </label>

          <label htmlFor="attr1">
            Attr01
            <input
              data-testid="attr1-input"
              id="attr1"
              type="number"
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
              placeholder="0 ~ 90"
            />
          </label>

          <label htmlFor="attr2">
            Attr02
            <input
              data-testid="attr2-input"
              id="attr2"
              type="number"
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
              placeholder="0 ~ 90"
            />
          </label>

          <label htmlFor="attr3">
            Attr03
            <input
              data-testid="attr3-input"
              id="attr3"
              type="number"
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
              placeholder="0 ~ 90"
            />
          </label>

          <label htmlFor="image">
            Imagem
            <input
              data-testid="image-input"
              id="image"
              type="text"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
              placeholder="Selecione a imagem"
            />
          </label>

          <label htmlFor="rare">
            Raridade
            <select
              data-testid="rare-input"
              id="rare"
              type="select"
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
              placeholder="Selecione a raridade"
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>

          <div>
            <label htmlFor="trunfo">
              <span>Super Trybe Trunfo</span>
              {
                hasTrunfo ? (
                  <span>Você já tem um Super Trunfo em seu baralho</span>
                ) : (
                  <input
                    data-testid="trunfo-input"
                    id="trunfo"
                    className="trunfo-input"
                    type="checkbox"
                    name="cardTrunfo"
                    checked={ cardTrunfo }
                    onChange={ onInputChange }
                  />
                )
              }
            </label>

            <button
              data-testid="save-button"
              id="save-button"
              disabled={ isSaveButtonDisabled }
              onClick={ onSaveButtonClick }
            >
              Salvar
            </button>
          </div>

        </form>
      </section>
    );
  }
}
// valores requeridos e tipificados pelo proptypes
Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
