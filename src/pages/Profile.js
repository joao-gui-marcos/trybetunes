import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: '',
      loading: true,
    };
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    this.setState(
      { loading: true },
      async () => {
        const request = await getUser();
        this.setState({
          userData: request,
          loading: false,
        });
      },
    );
  }

  render() {
    const { loading, userData } = this.state;
    return (
      <div>
        <Link to="/profile/edit">Editar perfil</Link>
        <div data-testid="page-profile">Profile</div>
        {loading && <div>Carregando...</div>}
        {!loading ? (
          <div>
            <div>{userData.name}</div>
            <div>{userData.email}</div>
            <div>{userData.description}</div>
            <img src={ userData.image } alt="profile pic" data-testid="profile-image" />
          </div>) : ''}
      </div>
    );
  }
}

export default Profile;
