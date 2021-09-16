import React, { Component } from "react";
import SearchBar from "./SearchBar";

import "./Search.css";

class Search extends Component {
  state = {
    profilesdb: [],
    isValid: false,
    postLoading: true,
  };

  render() {
    return (
      <React.Fragment>
        <div className="app">
          <SearchBar
            placeholder="Search By College Name... "
            logo={this.getLogoHandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
