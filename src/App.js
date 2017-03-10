import React from 'react';
import './App.css';
import SearchBar from './SearchBar.js';
import SuggestionList from './SuggestionList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      suggestionResults: []
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
    this.doSearch(searchText);
  }

  doSearch = (searchText) => {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (e) => {
      const response = JSON.parse(e.target.response);
      console.log(response);
      const suggestionResults = response.suggest.suggestions;
      this.setState({
        suggestionResults: suggestionResults
      });
    });
    oReq.open("GET", process.env.REACT_APP_SEARCH_URL + "/suggest/?suggester=name&q=" + searchText);
    oReq.send();
  }

  handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked", suggestion);
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
      </div>
    );
  }
}

export default App;
