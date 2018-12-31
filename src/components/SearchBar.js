import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      suggestions: []
    };
  }
  render() {
    return (
      <div>
        <form role="search">
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
            />
            <datalist id="ingredients">
              {/* TODO:  
              - populate it by the response data after x chars have been put in 
              - move to a separate component and use props children? */}
              <option value="basil" />
              <option value="onion" />
              <option value="tomato" />
            </datalist>
            <button onClick={this.onSearchClick}>Search</button>
          </div>
        </form>
      </div>
    );
  }
}
