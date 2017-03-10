import React from 'react';
import './App.css';
import SearchBar from './SearchBar.js';
import SuggestionList from './SuggestionList.js';
import SearchResultList from './SearchResultList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      suggestionResults: [],
      searchResults: []
    };
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
      searchText: searchText
    });
    this.fetchSuggestions(searchText);
  }

  fetchSuggestions = (searchText) => {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (e) => {
      const response = JSON.parse(e.target.response);
      const suggestionResults = response.suggest.suggestions;
      this.setState({
        suggestionResults: suggestionResults
      });
    });
    oReq.open("GET", process.env.REACT_APP_SEARCH_URL + "/suggest/?suggester=name&q=" + searchText);
    oReq.send();
  }

  handleSuggestionClick = (suggestion) => {
    this.setState({
      searchText: suggestion
    });
    this.fetchSearchResults(suggestion);
  }

  fetchSearchResults = (searchText) => {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (e) => {
      const response = JSON.parse(e.target.response);
      const searchResults = response.hits.hit.map((item) => item.fields);
      this.setState({
        searchResults: searchResults
      });
    });
    oReq.open("GET", process.env.REACT_APP_SEARCH_URL + "/search/?q=" + searchText);
    oReq.send();
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextInput={this.handleSearchTextInput}
        />
        <SuggestionList
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
