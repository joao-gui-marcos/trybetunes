import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    this.setState({
      loading: true,
    },

    async () => {
      const request = await getUser();
      this.setState({
        user: request.name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? <div>Carregando...</div> : <div data-testid="header-user-name">{user}</div>}
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites"> Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile"> Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
