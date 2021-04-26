import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import api from "./apis/api";

// const unsplash = new Unsplash({ accessKey: "M2D69tHCgCGYDPS9IsjqwnJ8sQ5TJIBppJDd9eCoPDY" });

class App extends Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      searchField: "",
      category: "",
      originalProductList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);

    this.criteria = {
      searchText: "",
      category: "",
    };
  }

  getProductDetails = () => {
    api
      .getData("/product-details")
      .then((response) => {
        this.setState({ productList: response.data });
        this.setState({ originalProductList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  filterResults = () => {
    let criteria = this.criteria,
      originalProductList = this.state.originalProductList;
    if (
      criteria.searchText === "" &&
      (criteria.category === "" || criteria.category === "Any")
    ) {
      this.setState({ productList: originalProductList });
      return;
    }

    let newObj = this.state.originalProductList;

    if (criteria.searchText !== "") {
      newObj = newObj.filter(function (el) {
        return el.productName.toLowerCase().includes(criteria.searchText);
      });
    }

    // newObj = this.state.productList;
    if (criteria.category !== "" && criteria.category !== "Any") {
      newObj = newObj.filter(function (el) {
        return el.type.toLowerCase().includes(criteria.category.toLowerCase());
      });
    }

    this.setState({ productList: newObj });
  };

  componentDidMount() {
    this.getProductDetails();
  }
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
    this.criteria.searchText = e.target.value;
    this.filterResults();
  };

  handleCategory = (e) => {
    this.setState({ category: e.target.value });
    this.criteria.category = e.target.value;
    this.filterResults();
  };
  render() {
    const { originalProductList, productList } = this.state;
    return (
      <>
        <div className="App">
          <h1>Welcome to my fantastic e-commerce website!!©</h1>
          <>
            <SearchBox
              placeholder="search products"
              handleChange={this.handleChange}
              handleCategory={this.handleCategory}
              category={this.state.category}
              originalProductList={originalProductList}
            ></SearchBox>
            <CardList productList={productList}></CardList>
          </>
        </div>
      </>
    );
  }
}

export default App;
