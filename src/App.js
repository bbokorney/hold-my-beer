import React from 'react';
import './App.css';
import SearchUrl from './SearchUrl.js';
import SearchBar from './SearchBar.js';
import SearchResultList from './SearchResultList.js';
import Facets from './Facets.js';
const queryString = require('query-string');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchStartIndex: 0,
      suggestionResults: [],
      searchResults: [],
      categories: [],
      styles: []
    };
  }

  searchUrl = (searchText, start = 0) => {
    const params = {
      q: searchText,
      start: start,
      "highlight.description": "{}",
      "facet.style": "{}",
      "facet.category": "{}"
    };
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

  mapSearchResults = (results) => {
    return results.hits.hit.map((item) => {
        var obj = item.fields;
        obj['id'] = item.id;
        if(item.highlights && item.highlights.description) {
          obj['description'] = item.highlights.description;
        }
        return obj
      });
  }

  fetchSearchResults = (searchText) => {
    const url = this.searchUrl(searchText);
    fetch(url)
    .then(resp => resp.json())
    .then(results => {
      // check that the search text is
      // for this query
      if(searchText !== this.state.searchText) {
        // if not, no need to update the results
        return;
      }
      const searchResults = this.mapSearchResults(results);
      this.setState({
        searchResults: searchResults,
        searchStartIndex: 0,
        suggestionResults: [],
        styles: results.facets.style.buckets,
        categories: results.facets.category.buckets
      });
    });
  }

  handleSearchTextSubmit = (e) => {
    this.fetchSearchResults(this.state.searchText);
  }

  handleMoreSubmit = (e) => {
    const searchIndex = this.state.searchStartIndex + 10;
    const url = this.searchUrl(this.state.searchText, searchIndex);
    fetch(url)
    .then(resp => resp.json())
    .then(results => {
      const searchResults = this.state.searchResults.concat(this.mapSearchResults(results));
      this.setState({
        searchResults: searchResults,
        searchStartIndex: searchIndex,
        suggestionResults: [],
        styles: results.facets.style.buckets,
        categories: results.facets.category.buckets
      });
    });
  }

  render() {
    return (
      <div className="App">
        <SearchUrl searchUrl={this.searchUrl(this.state.searchText, this.state.searchStartIndex)} />
        <SearchUrl searchUrl={this.suggestionUrl(this.state.searchText)} />
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextInput={this.handleSearchTextInput}
          onSearchTextSubmit={this.handleSearchTextSubmit}
          suggestions={this.state.suggestionResults}
          handleSuggestionClick={this.handleSuggestionClick}
        />
        <Facets categories={this.state.categories} styles={this.state.styles} />
        <SearchResultList
          results={this.state.searchResults}
        />
        <button onClick={this.handleMoreSubmit}>More</button>
      </div>
    );
  }
}

export default App;
