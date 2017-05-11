import React from 'react';
import './SearchUrl.css';

function SearchUrl(props) {
  const searchUrl = decodeURI(props.searchUrl.substring(59));
  return (
    <div className="SearchUrl">
      {searchUrl}
    </div>
  );
}

export default SearchUrl;
