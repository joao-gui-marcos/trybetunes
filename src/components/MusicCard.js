import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checkboxValue: false,
    };
    this.handleCheckbok = this.handleCheckbok.bind(this);
  }

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({
      checkboxValue: isFavorite,
    });
  }

  handleCheckbok() {
    const { checkboxValue } = this.state;
    const toogle = !checkboxValue;
    this.setState({
      checkboxValue: toogle,
    });
  }

  render() {
    const { trackName, previewUrl, trackId, addSongToFavorite } = this.props;
    const { loading, checkboxValue } = this.state;
    return (
      <div>
        <div>MusicCard</div>
        <div>{trackName}</div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="control">
          Favorita
          <input
            id="control"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ addSongToFavorite }
            checked={ checkboxValue }
            name={ trackId }
            onClick={ this.handleCheckbok }
          />
        </label>
        {loading && <div>Carregando...</div>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  addSongToFavorite: PropTypes.string.isRequired,
};

export default MusicCard;
