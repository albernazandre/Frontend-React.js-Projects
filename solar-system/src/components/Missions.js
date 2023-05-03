import React from 'react';
import Title from './Title';

// Criando o componenete Missions
class Missions extends React.Component {
  render() {
    return (
      <div data-testid="missions">
        <Title headline="Missões" />
      </div>
    );
  }
}

export default Missions;
