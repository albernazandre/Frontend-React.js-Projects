import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class FavoriteSongs extends React.Component {
  state = {
    favSong: false,
    loading: false,
  };

  componentDidMount() { // faz com que a funcao seja rodada apos o render
    this.myFavSong();
  }

  // myFavSong seta a key favSong do state para true ou false apos comparar se musicas favoritadas
  // tem id's identicos aos das musicas no props obj
  myFavSong = async () => {
    const { trackInfo: { trackId } } = this.props; // acessando trackId
    const musics = await getFavoriteSongs(); // musics advem da funcao que captura as musicas favoritas
    const favSong = musics ? musics // se houver musicas favoritas (funcao retornar), pegue aquelas com id identico
      .some((song) => song.trackId === trackId) : false; // senao, retorne false
    this.setState({ favSong }); // valor sera colocado na key favSong
    return favSong;
  };

  validateFav = async (favSong) => {
    const { trackInfo } = this.props; // acessando trackInfo da props
    const addRemove = favSong ? removeSong : addSong; // caso haja parametro, remova musica
    this.setState({ loading: true }); // carregar pagina
    await addRemove(trackInfo); // remove info da musica anteriormente passada
    this.setState({ loading: false, favSong: !favSong }); // ao final pare de carregar e favSong fica vazia
  };

  render() {
    const { trackInfo: { trackId } } = this.props; // acessando trackId
    const { favSong, loading } = this.state; // acessando as keys do state
    return (
      loading ? <h3>Carregando...</h3> : (
        <label
          htmlFor={ trackId }
        >
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favSong"
            id={ trackId }
            checked={ favSong }
            onChange={ () => this.validateFav(favSong) }
          />
        </label>));
  }
}

FavoriteSongs.propTypes = {
  trackInfo: PropTypes.shape({
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // tipo string e number
  }).isRequired,
};

export default FavoriteSongs;
// finish
