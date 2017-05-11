import React from 'react';
import './App.css';
import SearchBar from './SearchBar.js';
import SearchResultList from './SearchResultList.js';
const queryString = require('query-string');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      suggestionResults: [],
      searchResults: []
    };
  }

  searchUrl = (params) => {
    return process.env.REACT_APP_SEARCH_URL + "/search/?"
    + queryString.stringify(params);
  }

  suggestionUrl = (searchText) => {
    return process.env.REACT_APP_SEARCH_URL + "/suggest/?"
      + queryString.stringify({suggester: "name", q: searchText});
  }

  handleSearchTextInput = (searchText) => {
    if (!searchText) {
      this.setState({
        searchText: '',
        suggestionResults: []
      });
      return;
    }

    this.setState({
      searchText: searchText,
    });
    this.fetchSuggestions(searchText);
  }

  fetchSuggestions = (searchText) => {
    const url = this.suggestionUrl(searchText);
    fetch(url)
    .then(resp => resp.json())
    .then(results => {
      // check that the search text is
      // for this query
      if(results.suggest.query !== this.state.searchText) {
        // if not, no need to update the results
        return;
      }
      const suggestionResults = results.suggest.suggestions;
      this.setState({
        suggestionResults: suggestionResults
      });
    });
  }

  handleSuggestionClick = (suggestion) => {
    this.setState({
      searchText: suggestion
    });
    this.fetchSearchResults(suggestion);
  }

  fetchSearchResults = (searchText) => {
    const url = this.searchUrl({q: searchText});
    fetch(url)
    .then(resp => resp.json())
    .then(results => {
      // check that the search text is
      // for this query
      if(searchText !== this.state.searchText) {
        // if not, no need to update the results
        return;
      }
      const searchResults = results.hits.hit.map((item) => {
        var obj = item.fields;
        obj['id'] = item.id;
        return obj
      });
      this.setState({
        searchResults: searchResults,
        suggestionResults: []
      });
    });
  }

  handleSearchTextSubmit = (e) => {
    this.fetchSearchResults(this.state.searchText);
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextInput={this.handleSearchTextInput}
          onSearchTextSubmit={this.handleSearchTextSubmit}
          suggestions={this.state.suggestionResults}
          handleSuggestionClick={this.handleSuggestionClick}
        />
        <SearchResultList
          results={this.state.searchResults}
        />
      </div>
    );
  }
}

export default App;
