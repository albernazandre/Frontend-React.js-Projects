import React, { Component } from 'react';

class ShoppingCart extends Component {
  render() {
    return (
      <div className="shopping-cart">
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}

export default ShoppingCart;
