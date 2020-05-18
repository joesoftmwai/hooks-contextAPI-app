import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import NotFound from './components/pages/NotFound';

import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <div className="App">
          <Navbar title="Github users locator" />
          <div className="container">
            <Alert />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/users/:username" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </AlertState>
    </GithubState>
  );
};

export default App;
