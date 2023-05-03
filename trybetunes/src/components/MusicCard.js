import React from 'react';
import PropTypes from 'prop-types';
import FavoriteSongs from './FavoriteSongs';

class MusicCard extends React.Component {
  render() {
    const { discArt, trackName, previewUrl, artistBand, trackId } = this.props; // constante que pega a capa do album, o nome da faixa e o player para tocar a musica
    return ( // Estrutura da capa com nome da faixa e player
      <div>
        <img
          src={ discArt }
          alt="Capa"
        />
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <FavoriteSongs
          trackInfo={ {
            trackName,
            discArt,
            previewUrl,
            trackId,
            artistBand,
          } }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  artwork: PropTypes.string,
}.isRequired;

export default MusicCard;
