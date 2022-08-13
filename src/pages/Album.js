import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      musics: [],
      fetchingFavorites: true,
      favoriteSongs: [],
      loadingFavorites: false,
    };
    this.fetchMusics = this.fetchMusics.bind(this);
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.addSongToFavorite = this.addSongToFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchMusics();
    this.fetchFavoriteSongs();
  }

  async fetchMusics() {
    const { match: { params: { id } } } = this.props;
    this.setState(
      { loading: true },
      async () => {
        const request = await getMusics(id);
        this.setState({
          musics: request,
          loading: false,
        });
      },
    );
  }

  async fetchFavoriteSongs() {
    this.setState(
      { fetchingFavorites: true },
      async () => {
        const request = await getFavoriteSongs();
        this.setState({
          favoriteSongs: request,
          fetchingFavorites: false,
        });
      },
    );
  }

  async addSongToFavorite(event) {
    const { musics } = this.state;
    const music = musics.find((elem) => elem.trackId === Number(event.target.name));
    if (event.target.checked === true) {
      this.setState(
        { loadingFavorites: true },
        async () => {
          await addSong(music);
          this.setState({
            loadingFavorites: false,
          });
        },
      );
    }
    if (event.target.checked === false) {
      this.setState(
        { loadingFavorites: true },
        async () => {
          await removeSong(music);
          this.fetchFavoriteSongs();
          this.setState({
            loadingFavorites: false,
          });
        },
      );
    }
  }

  render() {
    const { musics, loading, fetchingFavorites, favoriteSongs,
      loadingFavorites } = this.state;
    const loadingElem = <div>Carregando...</div>;
    return (
      <div>
        <div data-testid="page-album">Album</div>
        {loading && loadingElem}
        {!loading && <div data-testid="artist-name">{musics[0].artistName}</div>}
        {!loading && <div data-testid="album-name">{musics[0].collectionName}</div>}
        {fetchingFavorites && loadingElem}
        {loadingFavorites && loadingElem}
        {!loading && !fetchingFavorites && musics.slice(1).map((elem) => (
          <MusicCard
            key={ elem.trackId }
            trackName={ elem.trackName }
            previewUrl={ elem.previewUrl }
            trackId={ elem.trackId }
            music={ elem }
            isFavorite={ favoriteSongs.some((elem2) => elem2.trackId === elem.trackId) }
            addSongToFavorite={ this.addSongToFavorite }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
