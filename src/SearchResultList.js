import React from 'react';

function SearchResultList(props) {
  const listItems = props.results.map((result) => {
    return (
      <li key={result.id} > {result.name} - {result.city}, {result.state} </li>
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
