import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartBtn extends Component {
  render() {
    return ( // botao que leva ao carrinho
      <div className="cart-btn">
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de Compras
        </Link>
      </div>
    );
  }
}

export default CartBtn;
