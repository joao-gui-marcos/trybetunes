import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      loading: false,
      searchResult: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonValidation = this.buttonValidation.bind(this);
    this.fetchAlbum = this.fetchAlbum.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async fetchAlbum() {
    const { searchInput } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const request = await searchAlbumsAPI(searchInput);
        this.setState({
          searchResult: request,
          loading: false,
        });
      },
    );
  }

  buttonValidation() {
    const { searchInput } = this.state;
    return searchInput.length < 2;
  }

  render() {
    const { loading, searchResult, searchInput } = this.state;
    return (
      <div data-testid="page-search">
        Search
        {!loading && <input
          data-testid="search-artist-input"
          onChange={ this.handleChange }
          name="searchInput"
        />}
        {!loading ? (
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ this.buttonValidation() }
            onClick={ this.fetchAlbum }
          >
            Pesquisar
          </button>) : (<div>Test</div>)}
        {loading > 0 && <div>Carregando...</div>}
        {
          searchResult.length > 0 ? (
            <div>
              {' '}
              {`Resultado de álbuns de: ${searchInput}`}
              {' '}
            </div>) : (<div />)
        }
        {searchResult.length > 0 && searchResult.map((elem) => (
          <div
            key={ elem.collectionId }
          >
            <p>{elem.collectionName}</p>
            <Link
              data-testid={ `link-to-album-${elem.collectionId}` }
              to={ `/album/${elem.collectionId}` }
            >
              Link

            </Link>
          </div>
        ))}
        {searchResult.length === 0 && <div>Nenhum álbum foi encontrado</div>}
      </div>
    );
  }
}

export default Search;
