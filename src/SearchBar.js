import React from 'react';

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
      <form onSubmit={this.handleSearchTextSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.searchText}
          onChange={this.handleSearchTextInput}
        />
      </form>
    );
  }
}

export default SearchBar;
