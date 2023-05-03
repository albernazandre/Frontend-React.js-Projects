import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          // renderize atraves de dados recuperados da props, lá em Login utilizamos...
          // props no botao de 'Entrar' e na criacao do estado inicial
          render={ (props) => (<Login
            { ...props }
          />) }
        />
        <Route
          exact
          path="/carteira"
          render={ (props) => (<Wallet
            { ...props }
          />) }
        />
      </Switch>
    </main>
  );
}

export default App;
