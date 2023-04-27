import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CartBtn from './CartBtn';

class Search extends React.Component {
  state = {
    loading: false,
    categories: [], // lista de categorias de produto
    productsList: [], // lista dos produtos por categoria
  };

  async componentDidMount() { // espere render e faça isso
    this.setState({ loading: true });
    const categories = await getCategories();
    this.setState({ categories, loading: false }); // puxando as categorias da api e armazenando no estado
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchInput: value, // o input de pesquisa recebe o valor passado
    });
  };

  fetchProducts = async () => {
    const { searchInput } = this.state; // capturando searchInput
    this.setState({ loading: true });
    const productsList = await getProductsFromCategoryAndQuery('', searchInput);
    this.setState({ productsList: productsList.results, loading: false }); // seta que productList recebe os valores da function getProductsFromCategoryAndQuery cujo param é searchInput
  };

  gettingCategory = async ({ target }) => { // funcao que puxa os elementos de uma categoria
    const { value } = target;
    const getCategList = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${value}`); // requisicao para pegar as categorias
    const categList = await getCategList.json(); // deixando as categorias com dados mais limpos
    this.setState({
      selectCateg: value, // passe para a categoria o valor (objeto de produtos) encontrado
      productsList: categList.results, // a lista de produtos sera o resultado da categoria encontrada
    });
  };

  render() { // criando os elementos na pagina de Search que esta contida na pasta components
    const { categories, loading, searchInput, productsList, selectCateg } = this.state; // capturando as keys de state
    return ( // search esta sendo exportada para o App
      <div>
        <label htmlFor="search">
          <input
            type="text"
            name="searchInput"
            id="search"
            value={ searchInput }
            placeholder="Pesquise um produto"
            data-testid="query-input"
            onChange={ this.handleChange } // funcao que seta o valor em searchInput
          />
        </label>
        <button
          data-testid="query-button"
          onClick={ this.fetchProducts } // ao clicar no botao chama a funcao seta a lista de produtos
        >
          Pesquisar
        </button>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <CartBtn />
        { loading /* Se loadinf for true */ && <p>Loading...</p>}
        <div>
          <h4>Categorias:</h4>
          {
            categories.map((category) => ( // percorra array de categorias e crie uma section para
            // cada categoria com seu respectivo id, e uma label com input radio para cada categoria com nome e id
              <section key={ category.id }>
                <label htmlFor={ category.id } data-testid="category">
                  <input
                    data-testid="category"
                    name="categorieList"
                    type="radio"
                    value={ category.id } // o valor sera o id da categoria
                    checked={ category.id === selectCateg } // quando o radio button estiver checked é pq o id da categoria é identico ao selectCateg
                    id={ category.id }
                    onChange={ this.gettingCategory } // quando houver mudança chame a funcao que lista os produtos dentro da categoria
                  />
                  { category.name }
                </label>
              </section>
            ))
          }
        </div>
        <div>
          { productsList.length === 0 ? 'Nenhum produto foi encontrado' : ( // se a lista não tiver produtos, plote a mensagem...
            productsList && ( // se existir a lista
              productsList.map((product) => ( // crie atraves de map uma section para cada produto com...
                <section
                  key={ product.id } // imagem, titulo e preço, pegando tais valores atraves das keys do objeto do produto
                  data-testid="product"
                >
                  <Link
                    to={ `/products/${product.id}` }// link para a pagina de detalhes do produto tendo como parametro o id do produto
                    data-testid="product-detail-link" // o link ja engloba todo o card
                  >
                    <img src={ product.thumbnail } alt={ `Imagem de ${product.title}` } />
                    <h3>{product.title}</h3>
                    <h4>{product.price}</h4>
                  </Link>
                </section>
              ))
            )
          )}
        </div>
      </div>
    );
  }
}

export default Search;
