import React from 'react';

function SearchResultList(props) {
  const listItems = props.results.map((result) => {
    return (
      <li key={result.id}>
        <p>{result.name} - {result.brewery}</p>
        <p> {result.style}, {result.category} - {result.abv}% ABV, {result.ibu} IBU</p>
        <p>{result.description}</p>
      </li>
    );
  });
  return (
    <div>
      <p>Search results</p>
      <ul>
        {listItems}
      </ul>
    </div>
  );
}

export default SearchResultList;
