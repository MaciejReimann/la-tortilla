import React, { Component } from "react";

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
    // Fetch this.state.suggestions from here
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
              list="ingredients"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <datalist id="ingredients">
              {/* TODO:  
              - populate it by the response data after x chars have been put in 
              - move to a separate component and use props children? */}
              <option value="basil" />
              <option value="onion" />
              <option value="tomato" />
            </datalist>
            <button>Search</button>
          </div>
        </form>
      </div>
    );
  }
}
