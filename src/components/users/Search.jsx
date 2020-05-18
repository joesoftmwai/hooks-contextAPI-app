import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import ALertContext from '../../context/alert/alertContext';

const Search = () => {
  // state = {
  //   query: '',
  // };

  const githubContext = useContext(GithubContext);
  const alertContext = useContext(ALertContext);

  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(query);
      setQuery('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="query"
          value={query}
          onChange={handleChange}
          placeholder="Search Users..."
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
        {githubContext.users.length > 0 ? (
          <input
            type="button"
            value="Clear"
            className="btn btn-light btn-block"
            onClick={githubContext.clearUsers}
          />
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

export default Search;
