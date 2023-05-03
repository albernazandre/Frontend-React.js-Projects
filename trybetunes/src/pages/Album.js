import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    collection: '',
    artist: '',
    musics: [],
  };

  componentDidMount() { // faz com que a funcao seja rodada apos o render
    this.fetchTrack();
  }

  fetchTrack = async () => { // requisicao na API
    const { match: { params: { id } } } = this.props;// acessando o id dentro da props da API
    const getMusicsAPI = await getMusics(id); // capturando a funcao que procura as musicas baseado no parametro id que é o artista ou banda dentro da base de dados
    const arrMusic = getMusicsAPI.reduce((plusMusic, music) => { // acumulando as musicas e informações
      const { trackName, previewUrl, trackId, collectionName, kind } = music;

      if (kind === 'song') { // se o tipo for 'musica' o acumulador puxa os valores
        plusMusic.push({ trackName, collectionName, previewUrl, trackId });
      }
      return plusMusic;
    }, []); // valor inicial é array vazio
    const collection = getMusicsAPI[0]; // o album recebe o primeiro valor da API
    const { artistName, collectionName } = collection; // o album captura nome do artista e do album

    this.setState({ // sete os valores para keys do state
      collection: collectionName,
      artist: artistName,
      musics: arrMusic,
    });
  };

  render() {
    const { collection, artist, musics } = this.state;

    return (
      <div>
        <Header />
        <div data-testid="page-album"> Você está em Album</div>
        <div>
          <span data-testid="artist-name">{ artist }</span>
          <span data-testid="album-name">{ collection }</span>
        </div>
        <span>
          {musics.map(({ trackId, trackName, previewUrl }) => ( // criando o array de cards de musica com as informações da musica
            <MusicCard
              key={ trackId }
              trackId={ trackId }
              artist={ artist }
              trackName={ trackName }
              previewUrl={ previewUrl }
            />))}

        </span>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default Album;
