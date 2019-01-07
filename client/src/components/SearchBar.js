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
    // this.handleBlur = this.handleBlur.bind(this);
  }

  // handleFocusAndHover(e) {
  //   document.documentElement.style.setProperty("--input-bg", "white");
  // }
  // handleBlur(e) {
  //   document.documentElement.style.setProperty("--input-bg", "transparent");
  // }
  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
    // Prevent from displaying suggestion after inital selection:
    const noNeedForSuggestions = !this.state.suggestions.some(
      suggestion => suggestion === value
    );
    if (value.trim() !== "" && noNeedForSuggestions) {
      axios.get(`/suggestions/${value}`).then(res => {
        this.setState({ suggestions: res.data });
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearchClick(this.state.value);
  }
  render() {
    return (
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
          // onMouseOver={this.handleFocusAndHover}
          // onMouseOut={this.handleBlur}
          // onFocus={this.handleFocusAndHover}
          // onBlur={this.handleBlur}
          value={this.state.value}
        />
        <Datalist id="suggestions" values={this.state.suggestions} />
        <button type="submit" className="search-button">
          <i className="fas fa-search" />
        </button>
      </form>
    );
  }
}
