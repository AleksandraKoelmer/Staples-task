import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingText: '',
    };
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    var searchingText = event.target.value;
    this.setState({ searchingText: searchingText });
    this.props.handleSearch(searchingText);
  };

  render() {
    return <input
      type="text"
      onChange={this.handleChange}
      className='search-input'
      placeholder=" Search product..." />
  };
};

export default Search;