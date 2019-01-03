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
      console.log(res.data);
      this.setState({ suggestions: res.data });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearchClick();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} role="search">
          <div>
            <label htmlFor="ingredient-search">
              Ingredients you'd like to use:
            </label>
            <input
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
            <button>Search</button>
          </div>
        </form>
      </div>
    );
  }
}
