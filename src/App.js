import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
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
              <button>Search</button>
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
