import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route
            exact
            path="/search"
            render={ () => (
              <div>
                <Header />
                <Search />
              </div>) }
          />
          <Route
            exact
            path="/album/:id"
            render={ (props) => (
              <div>
                <Header />
                <Album { ...props } />
              </div>) }
          />
          <Route
            exact
            path="/favorites"
            render={ () => (
              <div>
                <Header />
                <Favorites />
              </div>) }
          />
          <Route
            exact
            path="/profile"
            render={ () => (
              <div>
                <Header />
                <Profile />
              </div>) }
          />
          <Route
            exact
            path="/profile/edit"
            render={ (props) => (
              <div>
                <Header />
                <ProfileEdit { ...props } />
              </div>) }
          />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
