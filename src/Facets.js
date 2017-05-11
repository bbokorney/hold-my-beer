import React from 'react';
import './Facets.css';

function Facets(props) {
  if(props.styles.length === 0 && props.categories.length === 0) {
    return (
      <div></div>
    );
  }
  return (
    <div className="Facets">
      {facetList(props.styles)}
      {facetList(props.categories)}
    </div>
  );
}

function facetList(buckets) {
  const items = buckets.map((item) => {
    return (<li key={item.value}>{item.value}: {item.count}</li>);
  });
  return (
    <ul className="Facets-list">
      {items}
    </ul>
  );
}

export default Facets;
