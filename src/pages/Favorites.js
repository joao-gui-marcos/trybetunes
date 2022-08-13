import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      fetchingFavorites: true,
      removingSong: false,
    };
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.removeSongFromFavorites = this.removeSongFromFavorites.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
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

  async removeSongFromFavorites(event) {
    const { favoriteSongs } = this.state;
    const music = favoriteSongs.find((ele) => ele.trackId === Number(event.target.name));
    this.setState(
      { removingSong: true },
      async () => {
        await removeSong(music);
        this.fetchFavoriteSongs();
        this.setState({
          removingSong: false,
        });
      },
    );
  }

  render() {
    const { fetchingFavorites, favoriteSongs, removingSong } = this.state;
    return (
      <div>
        <div data-testid="page-favorites">Favorites</div>
        {fetchingFavorites && <div>Carregando...</div>}
        {!fetchingFavorites && !removingSong && favoriteSongs.map((elem) => (
          <MusicCard
            key={ elem.trackId }
            trackName={ elem.trackName }
            previewUrl={ elem.previewUrl }
            trackId={ elem.trackId }
            music={ elem }
            isFavorite={ favoriteSongs.some((elem2) => elem2.trackId === elem.trackId) }
            addSongToFavorite={ this.removeSongFromFavorites }
          />))}
        {removingSong && <div>Carregando...</div>}
      </div>
    );
  }
}

export default Favorites;
