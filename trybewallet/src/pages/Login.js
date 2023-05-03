import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    btnDisabled: true,
    email: '',
    pass: '',
  };

  // funcoes que modificam o estado

  handleBtn = () => {
    const { history, dispatch } = this.props; // puxando history e o dispatch via props
    const { email } = this.state; // capturando o estado a ser modificado
    dispatch(actionEmail(email)); // dispara acao que modifica estado
    history.push('/carteira'); // rota após o click no botao
  };

  changeInputs = ({ target }) => {
    const minPassLength = 4;
    const { email, pass } = this.state;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (this.verifyEmail(email) && pass.length > minPassLength) { // verifica se e email e se ha valor minimo de caracteres na senha
        this.setState({ btnDisabled: false }); // habilitando botao caso condicoes sejam atendidas
      } else {
        this.setState({ btnDisabled: true });
      }
    });
  };

  // funcao de verificacao de email

  verifyEmail = (email) => {
    const emailShape = /\S+@\S+\.\S+/;
    return emailShape.test(email);
  };

  render() {
    const { pass, email, btnDisabled } = this.state;

    return (
      <div>
        <input
          value={ email }
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ this.changeInputs } // modificacao do estado ocorre via funcao changeInputs
        />
        <input
          type="password"
          data-testid="password-input"
          value={ pass }
          name="pass"
          onChange={ this.changeInputs } // modificacao do estado ocorre via funcao changeInputs
        />
        <button
          type="button"
          disabled={ btnDisabled }
          onClick={ this.handleBtn } // clique no botao chama a funcao handleBtn
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
