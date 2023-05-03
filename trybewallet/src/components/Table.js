import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionExcludeExp, actionEditExpId } from '../redux/actions';

class Table extends Component {
  // funcao que exclui despesa da table
  excludeExp = (expId) => {
    const { expenses, dispatch } = this.props;
    const excludedExp = expenses.find((exp) => exp.id === expId);
    dispatch(actionExcludeExp(excludedExp));
  };

  // funcao que edita id da despesa
  expEdit = (expId) => {
    const { dispatch } = this.props;
    dispatch(actionEditExpId(expId));//
  };

  render() {
    const { expenses } = this.props; // capturando as despesas via props
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                Descrição
              </th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((exp) => ( // metodo toFixed(2) coloca duas casas decimais no valor
            // ask é uma key de exchangeRates na API que pega os valores de conversao do momento
              <tr key={ exp.id }>
                <td>
                  {exp.description}
                </td>
                <td>
                  {exp.tag}
                </td>
                <td>
                  {exp.method}
                </td>
                <td>
                  {Number(exp.value).toFixed(2)}
                </td>
                <td>
                  {exp.currency}
                </td>
                <td>
                  {Number(exp.exchangeRates[exp.currency].ask).toFixed(2)}
                </td>
                <td>
                  {(exp.value
                  * exp.exchangeRates[exp.currency].ask).toFixed(2)}
                </td>
                <td>
                  {exp.exchangeRates[exp.currency].name}
                </td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.excludeExp(exp.id) }
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.expEdit(exp.id) }
                  >
                    Editar

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
