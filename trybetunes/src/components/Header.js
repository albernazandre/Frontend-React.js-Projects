import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Charging from '../pages/Charging';

class Header extends React.Component {
  state = {
    name: '',
    loading: true,
  };

  async componentDidMount() { // componentDidMount roda assim que o componente é colocado na tela
    const getU = await getUser();
    const { name } = getU; // espere getUser rodar
    this.setState({ // entao loading é igual a false
      name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state; // capturando as keys de state declaradas acima
    const userName = <p data-testid="header-user-name">{ name }</p>;
    return (
      <header data-testid="header-component">
        <div>{ loading ? <Charging /> : userName }</div>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
