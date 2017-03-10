import React from 'react';

class SuggestionList extends React.Component {
  render() {
    const listItems = this.props.suggestions.map((suggestion) => {
      return (
        <li
          key={suggestion.id}
          onClick={() => this.props.handleSuggestionClick(suggestion.suggestion)}
        >
          {suggestion.suggestion}
        </li>
      );
    });
    return (
      <div>
        <p>Search suggestions</p>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default SuggestionList;
