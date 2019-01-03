import React, { Component } from "react";

import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchClick(e) {
    console.log("clicked");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar />
        </header>
        <main>
          <CardList />
        </main>
      </div>
    );
  }
}

export default App;
