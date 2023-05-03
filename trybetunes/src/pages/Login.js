import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Charging from './Charging';

class Login extends React.Component {
  state = {
    name: '', // valor que irá no input do login
    buttonDisabled: true, // o botao na page de login começa desabilitado
    loading: false, // até que se clique, loading é false
  };

  loginValue = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validateBtn(value)); // dê ao array de keys name os respectivos 'value'
  }; // este segundo param em setState é uma callback da funcao validateBtn, ou seja, ela sera executada novamente com o novo valor de state

  // funcao que faz com que botao seja habilitado ou desabilitado a depender da quantid de caracteres
  validateBtn = (loginValue) => {
    const minLength = 3;
    if (loginValue.length >= minLength) {
      this.setState({ buttonDisabled: '' });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  render() {
    const { name, buttonDisabled, loading } = this.state; // capturando as keys de state declaradas acima
    const { history } = this.props; // declarando o objeto que contem o historico da rota

    return (
      <div data-testid="page-login">
        <form>
          <input // valor do input name é a key name
            type="text"
            id="name"
            name="name" // name recebe name
            data-testid="login-name-input"
            onChange={ this.loginValue } // apos mudança, execute a funcao loginValue
            value={ name } // valor vem da key name
          />
          <button
            data-testid="login-submit-button"
            disabled={ buttonDisabled } // o botao esta habilitado a depender da key buttondisabled
            onClick={ async () => { // setando o Loading
              this.setState({ loading: true });
              await createUser({ name }); // esperar a criação do usuario
              history.push('/search'); // apos carregado salve o nome e envie para a rota search
            } }
          >
            Entrar
          </button>
        </form>
        <span>{ loading ? <Charging /> : '' }</span>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ // shape (formato) indica a forma que queremos criar
    push: PropTypes.func.isRequired, // push e do tipo funcao
  }).isRequired, // history isRequired
};

export default Login;
