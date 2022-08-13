import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
      updatingUser: false,
      userUpdated: false,
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.pushUserUpdate = this.pushUserUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
    this.handleValidation();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleValidation() {
    const { name, email, description, image } = this.state;
    return !(email.includes('@') && name && image && description);
  }

  fetchUser() {
    this.setState(
      { loading: true },
      async () => {
        const request = await getUser();
        this.setState({
          name: request.name,
          email: request.email,
          description: request.description,
          image: request.image,
          loading: false,
        });
      },
    );
  }

  async pushUserUpdate() {
    const { name, email, image, description } = this.state;
    this.setState(
      { updatingUser: true },
      async () => {
        const newUser = {
          name,
          email,
          image,
          description,
        };
        await updateUser(newUser);
        this.setState({
          updatingUser: false,
          userUpdated: true,
        });
      },
    );
  }

  render() {
    const { loading, updatingUser, userUpdated,
      name, email, image, description } = this.state;
    return (
      <div>
        <div data-testid="page-profile-edit">ProfileEdit</div>
        {loading && <div>Carregando...</div>}
        {!loading ? (
          <div>
            <legend>Name: </legend>
            <input
              data-testid="edit-input-name"
              onChange={ this.handleChange }
              name="name"
              value={ name }
            />
            <legend>Email: </legend>
            <input
              data-testid="edit-input-email"
              onChange={ this.handleChange }
              name="email"
              value={ email }
            />
            <legend>Description: </legend>
            <input
              data-testid="edit-input-description"
              onChange={ this.handleChange }
              name="description"
              value={ description }
            />
            <legend>Image: </legend>
            <input
              data-testid="edit-input-image"
              onChange={ this.handleChange }
              name="image"
              value={ image }
            />
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ this.handleValidation() }
              onClick={ this.pushUserUpdate }
            >
              Save

            </button>
          </div>) : ''}
        {updatingUser && <div>Carregando...</div>}
        {!updatingUser && userUpdated && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
