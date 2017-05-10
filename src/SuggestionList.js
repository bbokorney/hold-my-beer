import React from 'react';
import './SuggestionList.css'

class SuggestionList extends React.Component {
  render() {
    const listItems = this.props.suggestions.map((suggestion) => {
      return (
        <li
          className="SuggestionList-item"
          key={suggestion.id}
          onClick={() => this.props.handleSuggestionClick(suggestion.suggestion)}
        >
          {suggestion.suggestion}
        </li>
      );
    });
    return (
      <ul className="SuggestionList-list">
        {listItems}
      </ul>
    );
  }
}

export default SuggestionList;
