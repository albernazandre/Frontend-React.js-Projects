import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSaveExpense, fetchOnCurr, actionEditExp } from '../redux/actions';

class WalletForm extends Component {
  // estado com as keys de caracteristicas da despesa
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() { // componentDidMount dispara a acao apos renderizar elementos DOM
    const { dispatch } = this.props;
    dispatch(fetchOnCurr());
  }

  // function que seta valores da despesa
  savingExpenses = async (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    const curr = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJSON = await curr.json();
    this.setState({ exchangeRates: responseJSON }, () => { // exchangeRates sao os tipos de moedas
      dispatch(actionSaveExpense(this.state));// a actionSaveExpense recebe como param o estado
      this.setState({
        value: '',
        description: '',
        exchangeRates: '',
      });
    });
  };

  // funcao que edita elemento de despesa
  expensesEdit = (event) => {
    event.preventDefault();
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expToEdit = expenses.find((expEdited) => expEdited.id === idToEdit);
    const expEdited = {
      ...expToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };
    this.setState({ // valores ficam vazios para serem editados
      value: '',
      description: '',
      exchangeRates: '',
    });
    dispatch(actionEditExp(expEdited));
  };

  // funcao que muda os valores do estado de atributo da despesa
  changingAttributes = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value; // em caso de tipo de elemento ser checkbox
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state; // capturando os states
    const { currencies, editor } = this.props; // capturando via props a lista de moedas da api
    return (
      <div className="formularioDespesa">
        <form>
          <labbel>
            Valor da Despesa
            <input
              data-testid="value-input"
              value={ value }
              name="value"
              type="number"
              onChange={ this.changingAttributes } // changinATT esta modificando os estados
            />
          </labbel>
          <labbel>
            Descrição
            <input
              data-testid="description-input"
              value={ description }
              name="description"
              type="text"
              onChange={ this.changingAttributes }
            />
          </labbel>
          <labbel htmlFor="selectCurrency">
            Moeda
            <select
              id="selectCurrency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.changingAttributes }
            >
              {currencies.map((c) => ( // cria map para passar pelas moedas e adicionar uma opcao para cada
                <option
                  key={ c }
                  value={ c }
                >
                  {c}

                </option>
              ))}
            </select>
          </labbel>
          <labbel htmlFor="payment">
            {' '}
            Forma de pagamento
            <select
              id="payment"
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.changingAttributes }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </labbel>
          <labbel htmlFor="category">
            {' '}
            Gasto feito em:
            <select
              id="category"
              data-testid="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.changingAttributes }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </labbel>
          {!editor ? (
            <button
              type="submit"
              onClick={ this.savingExpenses }
            >
              Adicionar despesa

            </button>
          )
            : (
              <button
                type="submit"
                onClick={ this.expensesEdit }
              >
                Editar despesa

              </button>
            )}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({ // mapeando estado global para passa-lo
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
