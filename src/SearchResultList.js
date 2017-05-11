import React from 'react';
import './SearchResultList.css';

function SearchResultList(props) {
  const listItems = props.results.map((result) => {
    return (
      <div className="SearchResult-item" key={result.id}>
        <div className="SearchResult-wrapper">
          <div className="SearchResult-summary">
            <span className="SearchResultList-name">{result.name}</span>
            <span>{result.brewery}</span>
            <span>{result.style}</span>
            <span>{result.category}</span>
            <span>{result.abv}% ABV</span>
            <span>{result.ibu} IBU</span>
          </div>
          <div className="SearchResult-description">
            <span dangerouslySetInnerHTML={{ __html: result.description }}></span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="SearchResultList-list">
      <p></p>
      {listItems}
    </div>
  );
}

export default SearchResultList;
