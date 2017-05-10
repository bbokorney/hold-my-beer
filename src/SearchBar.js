import React from 'react';
import SuggestionList from './SuggestionList.js';
import './SearchBar.css';

class SearchBar extends React.Component {
  handleSearchTextInput = (e) => {
    this.props.onSearchTextInput(e.target.value);
  }

  handleSearchTextSubmit = (e) => {
    e.preventDefault();
    this.props.onSearchTextSubmit(e);
  }

  render() {
    return (
      <div className="SearchBar-container">
        <form onSubmit={this.handleSearchTextSubmit}>
          <input
            className="SearchBar-input"
            type="text"
            placeholder="Search..."
            value={this.props.searchText}
            onChange={this.handleSearchTextInput}
          />
        </form>
        <SuggestionList
          suggestions={this.props.suggestions}
          handleSuggestionClick={this.props.handleSuggestionClick}
        />
      </div>
    );
  }
}

export default SearchBar;
