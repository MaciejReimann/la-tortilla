import React, { Component } from "react";
import axios from "axios";

import Datalist from "./generic/Datalist";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.props.onValueChange(value);
    // TODO: Prevent from displaying suggestion after inital selection:
    if (value.trim() !== "") {
      axios.get(`/suggestions/${value}`).then(res => {
        this.setState({ suggestions: res.data });
      });
    }
  }
  render() {
    return (
      <form
        className="search-bar"
        onSubmit={this.props.onSearchClick}
        role="search"
      >
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
          value={this.props.value}
        />
        <Datalist id="suggestions" values={this.state.suggestions} />
        <button type="submit" className="search-button">
          <i className="search-icon fas fa-search" />
        </button>
      </form>
    );
  }
}
