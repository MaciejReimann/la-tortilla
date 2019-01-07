import React, { Component } from "react";
import axios from "axios";

import Header from "./components/generic/Header";
import Main from "./components/generic/Main";
import Aside from "./components/generic/Aside";
import Footer from "./components/generic/Footer";

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
      allFetched: false,
      loading: false,
      ingredients: [],
      recipes: [],
      error: ""
    };
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const lastIngredientBefore = this.state.ingredients[
  //     this.state.ingredients.length - 1
  //   ];
  //   const lastIngredientAfter =
  //     nextState.ingredients[nextState.ingredients.length - 1];
  //   const areIngredientsNew = lastIngredientBefore === lastIngredientAfter;
  //   return !this.state.allFetched && !areIngredientsNew;
  // }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  fetchRecipes(value, p) {
    this.setState({ loading: true });
    if (p === 1) {
      this.setState({ allFetched: false });
    }

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
      .get(`/recipes/${encodedQuery}/${p}`)
      .then(res => {
        if (!res.data.length) {
          // TODO:
          // const handleTooLongWaiting = () => new Promise((res, rej) => res())
        }
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

  handleScroll() {
    // This should not be here as it causes irritating delay on scroll;
    if (!this.state.allFetched) {
      this.fetchRecipes(encodeURI(this.state.ingredients.join()), 2);
      this.setState({ allFetched: true });
    }
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
          <SearchBar onSearchClick={this.fetchRecipes} />
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
        <Footer ref="footer" className="invisible-footer" />
      </div>
    );
  }
}

export default App;
