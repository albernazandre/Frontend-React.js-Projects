import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // funcao que soma despesas
  sumOfExpenses = () => {
    const { expenses } = this.props;
    const expenseSum = expenses.reduce(((acc, current) => {
      const totalExpense = current.value * current.exchangeRates[current.currency].ask;
      acc += totalExpense;
      return acc;
    }), 0);
    return expenseSum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">{this.sumOfExpenses()}</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
