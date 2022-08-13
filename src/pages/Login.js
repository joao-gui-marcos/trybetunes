import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginNameValue: '',
      loading: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonValidation = this.buttonValidation.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  buttonValidation() {
    const maxLength = 3;
    const { loginNameValue } = this.state;
    return loginNameValue.length < maxLength;
  }

  async buttonClick() {
    const { loginNameValue } = this.state;
    const newUser = {
      name: loginNameValue,
    };
    this.setState(
      { loading: true },
      async () => {
        await createUser(newUser);
        this.setState({
          loading: false,
          redirect: true,
        });
      },

    );
  }

  render() {
    const { loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <input
          data-testid="login-name-input"
          onChange={ this.handleChange }
          name="loginNameValue"
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ this.buttonValidation() }
          onClick={ this.buttonClick }
        >
          Entrar
        </button>
        {loading && <div>Carregando...</div>}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
