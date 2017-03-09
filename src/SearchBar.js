import React from 'react';

class SearchBar extends React.Component {
  handleFilterTextInputChange = (e) => {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

export default SearchBar;
