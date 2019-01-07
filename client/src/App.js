import React, { Component } from "react";
import axios from "axios";

import Header from "./components/generic/Header";
import Main from "./components/generic/Main";
import Aside from "./components/generic/Aside";

import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";
import ErrorCard from "./components/ErrorCard";

import "./styles/layout.css";
import "./styles/colors.css";
import "./styles/searchbar.css";
import "./styles/card.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ingredients: [],
      recipes: [],
      error: ""
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleAddSearchQuery = this.handleAddSearchQuery.bind(this);
  }

  handleAddSearchQuery(value) {
    console.log(value);
  }

  handleSearchClick(value) {
    this.setState({ loading: true });

    // Filter out ingredient duplicates before updating the state:
    const filiteredDuplicates = [...this.state.ingredients, value].filter(
      (item, i, arr) => arr.indexOf(item) === i
    );
    // Transform the ingredients array into a string:
    const ingredentsQuery = filiteredDuplicates.join();
    // Encode the query:
    const encodedQuery = encodeURI(ingredentsQuery);
    // Fetch the recipes:
    axios
      .get(`/recipes/${encodedQuery}`)
      .then(res => {
        this.setState({
          loading: false,
          ingredients: filiteredDuplicates,
          recipes: res.data
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: `Sorry, we're having some problems on LaTortilla servers`
        });
      });
  }

  render() {
    const { loading, ingredients, recipes, error } = this.state;
    const welcome = ingredients.length === 0 && recipes.length === 0;
    const noRecipes = ingredients.length !== 0 && recipes.length === 0;

    const spinnerComponent = <div>Loading...</div>;
    const errorComponent = <div>{error}</div>;
    const welcomeComponent = <div>Welcome!</div>;
    const noRecipesComponent = <ErrorCard />;
    const recipesList = (
      <CardList data={recipes} addSearchItem={this.handleAddSearchQuery} />
    );
    return (
      <div className="app">
        <Header className="header">
          <SearchBar onSearchClick={this.handleSearchClick} />
        </Header>
        <Aside className="aside-left" />
        <Main>
          {loading
            ? spinnerComponent
            : error
            ? errorComponent
            : welcome
            ? welcomeComponent
            : noRecipes
            ? noRecipesComponent
            : recipesList}
        </Main>
        <Aside className="aside-right" />
      </div>
    );
  }
}

export default App;
