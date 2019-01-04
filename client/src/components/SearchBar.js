import React, { Component } from "react";
import axios from "axios";

import Datalist from "./generic/Datalist";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState(state => ({ value }));

    axios.get(`/suggestions/${value}`).then(res => {
      this.setState({ suggestions: res.data });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearchClick(this.state.value);
  }
  render() {
    return (
      // <div >
      <form className="search-bar" onSubmit={this.handleSubmit} role="search">
        <label htmlFor="ingredient-search" />
        <input
          className="search-input"
          name="ingredient-search"
          id="ingredient-search"
          type="search"
          placeholder="Search for ingredients..."
          aria-label="search for the ingredients you'd like to use"
          autoFocus={true}
          list="suggestions"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <Datalist id="suggestions" values={this.state.suggestions} />
        <button className="search-button">Search</button>
      </form>
      // </div>
    );
  }
}
