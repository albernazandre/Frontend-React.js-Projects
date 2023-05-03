import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumApi from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    search: '',
    buttonDisabled: true,
    musics: '',
    result: '',
    validation: false,
  };

  searchValue = ({ target }) => { // funcao que passa valores para o estado
    const { value, name } = target;
    this.setState({ [name]: value }, this.validateBtn(value));// dê ao array de keys name os respectivos 'value'
  }; // este segundo param em setState é uma callback da funcao validateBtn, ou seja, ela sera executada novamente com o novo valor de state

  validateBtn = (searchValue) => { // funcao que valida botao de pesquisa, tamanho minimo da palavra de 2 caracteres
    const minLength = 2;
    if (searchValue.length >= minLength) {
      this.setState({ buttonDisabled: '' });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  searchingMus = async () => {
    const { search } = this.state;
    const arrCds = await searchAlbumApi(search); // espere fazer a pesquisa. o array de albums virá atraves do parametro passado para a funcao que pesquisa os discos por meio do artista passado
    if (arrCds.length === 0) this.setState({ musics: '' }); // se o array de albums for igual 0, não ha musicas
    if (arrCds.length > 0) this.setState({ musics: arrCds }); // se houver albums, musics recebe o array de cds
    this.setState({ result: search, search: '', validation: true });
  };

  musicArray = () => {
    const { musics } = this.state;
    return musics
      .map((album) => ( // acessando as keys da api e criando novo array
        <div key={ album.collectionName }>
          <p>
            {album.collectionName}
          </p>
          <Link
            to={ `/album/${album.collectionId}` }
            data-testid={ `link-to-album-${album.collectionId}` } // criando link ate a musica
          >
            Sobre
          </Link>
        </div>));
  };

  render() {
    const { search, buttonDisabled, musics, result, validation } = this.state;
    const myMusics = musics ? ( // se music existir retorne albums ou se nao, retorne "Nenhum album foi encont"
      <div>
        <h3>{`Resultado de álbuns de: ${result}`}</h3>
        {this.musicArray()}
      </div>) : <p>Nenhum álbum foi encontrado</p>;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            value={ search }
            name="search"
            onChange={ this.searchValue }
            data-testid="search-artist-input"
          />
          <button
            disabled={ buttonDisabled }
            data-testid="search-artist-button"
            onClick={ this.searchingMus } // quando clicar execute searchingMus
          >
            Pesquisar
          </button>
        </form>
        <div>
          { validation ? myMusics : '' /* retorne as musicas encontradas ou que nenhm */ }
        </div>
      </div>
    );
  }
}

export default Search;
