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
    console.log("clicked");
    axios.get(`/recipes/onions`).then(res => {
      this.setState({ ingredients: value, recipes: res.data });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar onSearchClick={this.handleSearchClick} />
        </header>
        <main>
          <CardList />
        </main>
      </div>
    );
  }
}

export default App;
