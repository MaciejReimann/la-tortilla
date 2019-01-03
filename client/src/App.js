import React, { Component } from "react";

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

        </header>
        <main>
          <CardList />
        </main>
      </div>
    );
  }
}

export default App;
