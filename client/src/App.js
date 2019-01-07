import React, { Component } from "react";
import axios from "axios";

import Header from "./components/generic/Header";
import Main from "./components/generic/Main";
import Aside from "./components/generic/Aside";
import Footer from "./components/generic/Footer";

import SearchBar from "./components/SearchBar";
import TagField from "./components/TagField";
import CardList from "./components/CardList";
import ErrorCard from "./components/ErrorCard";

import "./styles/layout.css";
import "./styles/colors.css";
import "./styles/searchbar.css";
import "./styles/card.css";
import "./styles/tag.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      searchValue: "",
      allRecipesFetched: false,
      isLoading: false,
      ingredients: [],
      recipes: []
    };
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  removeIngredient(value) {
    const nextIngredients = this.state.ingredients.filter(ing => ing !== value);
    this.setState({ ingredients: nextIngredients });
  }

  updateSearchValue(searchValue) {
    this.setState({ searchValue });
  }

  addIngredient(value) {
    this.updateSearchValue(value);
    console.log(value);
  }

  handleSearchClick(e) {
    e.preventDefault();
    this.fetchRecipes(this.state.searchValue, 1);
  }

  fetchRecipes(value, p) {
    this.setState({ isLoading: true });
    if (p === 1) {
      this.setState({ allRecipesFetched: false });
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
          isLoading: false,
          ingredients: filiteredDuplicates,
          recipes: res.data,
          searchValue: ""
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
          error: `Sorry, we're having some problems on LaTortilla servers`
        });
      });
  }

  handleScroll() {
    if (!this.state.allRecipesFetched) {
      this.fetchRecipes(this.state.ingredients.slice(-1)[0], 2);
      this.setState({ allRecipesFetched: true });
    }
  }

  render() {
    const { isLoading, ingredients, recipes, error } = this.state;
    const welcome = ingredients.length === 0 && recipes.length === 0;
    const noRecipes = ingredients.length !== 0 && recipes.length === 0;

    const renderMain = () => {
      let content;
      if (welcome) {
        content = (
          <div className="welcome">
            <i className="welcome-icon fas fa-utensils" />
          </div>
        );
      } else if (error) {
        content = <div>{error}</div>;
      } else if (noRecipes) {
        content = <ErrorCard />;
      } else if (recipes) {
        if (isLoading) {
          content = (
            <div>
              <div className="loading">
                <i className="welcome-icon fas fa-utensils" />
              </div>{" "}
              <CardList data={recipes} addSearchItem={this.addIngredient} />
            </div>
          );
        } else {
          content = (
            <CardList data={recipes} addSearchItem={this.addIngredient} />
          );
        }
      }
      return content;
    };

    return (
      <div className="app">
        <Header className="header">
          <SearchBar
            value={this.state.searchValue}
            searchValues={this.state.ingredients}
            onSearchClick={this.handleSearchClick}
            onValueChange={this.updateSearchValue}
          />
        </Header>
        <TagField
          tags={this.state.ingredients}
          onTagClick={this.removeIngredient}
        />
        <Aside className="aside-left" />
        <Main>{renderMain()}</Main>
        <Aside className="aside-right" />
        <Footer ref="footer" className="invisible-footer" />
      </div>
    );
  }
}

export default App;
