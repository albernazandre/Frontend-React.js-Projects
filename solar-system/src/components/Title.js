import React from 'react';
import PropTypes from 'prop-types';

// Criando o componenete Title
class Title extends React.Component {
  render() {
    const { headline } = this.props; // constante que recebe o tipo de valor
    return <h2>{ headline }</h2>;
  }
}

Title.propTypes = {
  headline: PropTypes.string.isRequired, // tipo string e obrigatorio
};

export default Title;
