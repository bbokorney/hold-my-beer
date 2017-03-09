import React from 'react';
import './App.css';
import SearchBar from './SearchBar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      results: []
    };
  }

  handleFilterTextInput = (filterText) => {
    if (!filterText) {
      this.setState({
        filterText: '',
        results: []
      });
      return;
    }

    this.setState({
      filterText: filterText
    });
    this.doSearch(filterText);
  }

  doSearch = (filterText) => {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (e) => {
      const response = JSON.parse(e.target.response);
      console.log(response);
      const results = response.suggest.suggestions;
      this.setState({
        results: results
      });
    });
    oReq.open("GET", process.env.REACT_APP_SEARCH_URL + "/suggest/?suggester=name&q=" + filterText);
    oReq.send();
  }

  render() {
    const listItems = this.state.results.map((result) => {
      return <li key={result.id}>{result.suggestion}</li>
    });
    return (
      <div className="App">
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <ol>
          {listItems}
        </ol>
      </div>
    );
  }
}

export default App;
