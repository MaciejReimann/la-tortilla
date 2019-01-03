import React, { Component } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipes: []
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchClick(value) {
    // Query must be a string of (unique) ingredients,
    // coma separated, no spaces between;
    const nextIngredients = [...this.state.ingredients, value].filter(
      (item, i, arr) => arr.indexOf(item) === i
    );
    const query = nextIngredients.join();

    axios.get(`/recipes/${query}`).then(res => {
      this.setState({
        ingredients: nextIngredients,
        recipes: res.data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar onSearchClick={this.handleSearchClick} />
        </header>
        <main>
          <CardList data={this.state.recipes} />
        </main>
      </div>
    );
  }
}

export default App;
