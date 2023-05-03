import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    hasTrunfo: false,
    cardList: [],
  };

  savingFields = ({ // Funcao que habilita o botao Save
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
  }) => { //  valor final booleano de disable button
    let validSaving = false;
    const totalSum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const maxAttr = 90;
    const maxAttrSum = 210;
    // logica condicional de disable button
    if (!cardName || !cardDescription || !cardImage || !cardRare
      || cardAttr1 > maxAttr || cardAttr1 < 0 || cardAttr2 > maxAttr
      || cardAttr2 < 0 || cardAttr3 > maxAttr || cardAttr3 < 0
      || totalSum > maxAttrSum) { validSaving = true; }
    return validSaving;
  };

  checkingTrunfo = ({ cardList }) => { // Funcao que checa na lista de cartas qual é a trunfo
    const trunfoCard = cardList.some((theCard) => theCard.cardTrunfo);
    return trunfoCard;
  };

  onInputChange = ({ target }) => { // funcao que passa valores para o estado
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value; // se for checkbox o campo, cheque se está marcado
    this.setState({ [name]: value });
    this.setState((state) => ({ isSaveButtonDisabled: this.savingFields(state) })); // o estado irá depender do resultado da funcao savingfields
  };

  onSaveButtonClick = () => { // funcao que passa valores iniciais para as keys do estado quando se clica no botao de salvar
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      cardList,
    } = this.state;
    this.setState({
      cardList: [...cardList, {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      }],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    });
    this.setState((state) => ({ // estado depende das funcoes savingfields e checkingtrunfo
      isSaveButtonDisabled: this.savingFields(state),
      hasTrunfo: this.checkingTrunfo(state),
    }));
  };

  render() { // valores a serem renderizados
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      cardList,
    } = this.state;

    return (
      <div>
        <section>
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            hasTrunfo={ hasTrunfo }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </section>
        <section>
          { cardList.length > 0 && <h3>BARALHO</h3> }
          { cardList.length > 0 && cardList.map((c, x) => (
            <article key={ `${x}` }>
              <Card
                cardName={ c.cardName }
                cardDescription={ c.cardDescription }
                cardAttr1={ c.cardAttr1 }
                cardAttr2={ c.cardAttr2 }
                cardAttr3={ c.cardAttr3 }
                cardImage={ c.cardImage }
                cardRare={ c.cardRare }
              />
            </article>
          ))}
        </section>
      </div>
    );
  }
}

export default App;
