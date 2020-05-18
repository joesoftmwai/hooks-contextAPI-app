import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  GET_INITIAL_USERS,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GitHubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // getInitialUsers
  const getInitialUsers = () => {
    setLoading();
    axios
      .get(
        `https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`
      )
      .then((res) => {
        dispatch({
          type: GET_INITIAL_USERS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.message));
  };

  // search users
  const searchUsers = (query) => {
    setLoading();
    axios
      .get(
        `https://api.github.com/search/users?q=${query}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      )
      .then((res) => {
        dispatch({
          type: SEARCH_USERS,
          payload: res.data.items,
        });
      })
      .catch((err) => console.log(err.message));
  };

  // get user
  const getUser = (username) => {
    setLoading();
    axios
      .get(
        `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
      )
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.message));
  };

  // get repos
  const getUserRepos = (username) => {
    setLoading();
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      )
      .then((res) => {
        return dispatch({
          type: GET_REPOS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        getInitialUsers,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GitHubState;
