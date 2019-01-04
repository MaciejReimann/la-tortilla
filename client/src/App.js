import React, { Component } from "react";
import axios from "axios";

import Header from "./components/generic/Header";
import Main from "./components/generic/Main";
import Aside from "./components/generic/Aside";
// import CSSGrid from "./components/generic/CSSGrid";

import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";

import "./app.css";

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
      <div className="app">
        <Header className="header">
          <SearchBar onSearchClick={this.handleSearchClick} />
        </Header>
        <Aside className="aside-left" />
        <Main>
          <CardList data={this.state.recipes} />
        </Main>
        <Aside className="aside-right" />
      </div>
    );
  }
}

export default App;
