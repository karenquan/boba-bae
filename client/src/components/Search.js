import React, { Component } from "react";
import Business from "./Business";
import LoadingScreen from "./LoadingScreen";
import Nav from "./Nav";
import GoogleMap from "./GoogleMap";
import Pagination from "./Pagination";
import NoBoba from "./NoBoba";
import * as API from "../util/API";
import * as helpers from "../util/helpers";
import "../styles/search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    let propsState = props.location.state;
    let searchLocation =
      propsState !== undefined ? propsState.searchLocation : "";
    let loading = propsState !== undefined ? propsState.loading : false;

    this.state = {
      location: "",
      searchLocation: searchLocation,
      loading: loading
    };
  }

  componentDidMount() {
    this.executeNewSearch(this.state.searchLocation);
  }

  // Search box handler
  handleLocationInput = evt => {
    this.setState({ searchLocation: evt.target.value });
  };

  // Search box validation
  canBeSubmitted = () => {
    const { location } = this.state;
    return location.length > 0;
  };

  // Calculate index range of search results
  calculateIndexRange = () => {
    let { currentPage, results } = this.state;
    let startIndex = currentPage * 20 - 19,
      endIndex = startIndex + results.length - 1;

    this.setState({
      startIndex: startIndex,
      endIndex: endIndex
    });
  };

  // Execute new search
  executeNewSearch = location => {
    this.setState({ loading: true });

    API.getBusinesses(location, 0)
      .then(results => {
        let { total, businesses } = results.data;
        let newCoords = helpers.getLocationCoords(businesses);
        this.setState(
          {
            results: businesses,
            location: this.state.searchLocation,
            searchLocation: "",
            total: total,
            loading: false,
            locationCoords: newCoords,
            offset: total % 20,
            totalPages: Math.ceil(total / 20),
            currentRange: 0,
            currentPage: 1,
            startIndex: 1,
            endIndex: businesses.length,
            indexRange:
              businesses.length > 1
                ? `${this.state.startIndex}-${this.state.endIndex}`
                : total
          },
          () => {
            // Scroll page to top
            helpers.scrollPageToTop("auto");
            // Build pagination indexes if more than 1 page
            if (total > 1) {
              this.buildPaginationIndexes();
            }
          }
        );
      })
      .catch(err => {
        // console.log("error getting businesses", err);
        this.setState({
          loading: false,
          location: this.state.searchLocation
        });
      });
  };

  // Search submit button event
  handleSubmit = evt => {
    if (!this.canBeSubmitted) {
      evt.preventDefault();
      return;
    }
    evt.preventDefault();
    this.executeNewSearch(this.state.searchLocation);
  };

  // Update search results (function to send to Pagination component)
  updateSearchResults = index => {
    let offset = (index - 1) * 20;
    this.setState({ loading: true });

    API.getBusinesses(this.state.location, offset)
      .then(results => {
        let newCoords = helpers.getLocationCoords(results.data.businesses);

        this.setState(
          {
            results: results.data.businesses,
            loading: false,
            locationCoords: newCoords,
            currentPage: index
          },
          () => {
            // scroll page to top
            helpers.scrollPageToTop("auto");
            this.calculateIndexRange();
          }
        );
      })
      .catch(err => {
        // console.log("error getting businesses", err);
        this.setState({
          loading: false,
          location: this.state.searchLocation,
          total: 0
        });
      });
  };

  // // Update pagination range (function to send to Pagination component)
  updatePaginationNext = () => {
    let { currentRange } = this.state;
    // let range = direction === "next" ? currentRange + 1 : currentRange - 1;
    this.setState({
      currentRange: currentRange + 1
    });
  };

  // // Update pagination range (function to send to Pagination component)
  updatePaginationPrev = () => {
    let { currentRange } = this.state;
    this.setState({
      currentRange: currentRange - 1
    });
  };

  // Build array of pagination indexes (i.e. [1,2,3,4,5])
  buildPaginationIndexes = () => {
    let { totalPages } = this.state;
    let pageRangeOffset = totalPages % 5;
    let pageRanges = Math.floor(totalPages / 5); // full range of 1-5

    let rangeIndexes = [];

    // for each range of 5 pages
    for (let r = 0; r < pageRanges; r++) {
      // create an array of 5 values
      let rangeValues = [];
      for (let i = r * 5 + 1; i < r * 5 + 6; i++) {
        rangeValues.push(i);
      }
      rangeIndexes.push(rangeValues);
    }

    // Add offsets, if any
    if (pageRangeOffset > 0) {
      let offsets = [];
      for (let i = totalPages - pageRangeOffset; i < totalPages; i++) {
        offsets.push(i + 1);
      }
      rangeIndexes.push(offsets);
    }

    // Set state with array of ranges with indexes
    this.setState({
      ...this.state,
      rangeIndexes: rangeIndexes,
      pageRanges: pageRanges
    });
  };

  // Scroll to top click
  scrollPageToTop = () => {
    helpers.scrollPageToTop("smooth");
  };

  render() {
    let {
      results,
      total,
      location,
      searchLocation,
      startIndex,
      totalPages,
      currentPage,
      endIndex,
      loading,
      indexRange,
      currentRange,
      pageRanges,
      rangeIndexes
    } = this.state;

    let buttonEnabled = searchLocation.length > 0 ? true : false;
    let hasLocation = location.length ? true : false;
    let reviewText = "";

    if (location !== undefined && results !== undefined) {
      indexRange = results.length > 1 ? `${startIndex}-${endIndex}` : total;
      reviewText = total > 1 ? "results" : "result";
    }

    return (
      <React.Fragment>
        {loading && <LoadingScreen />}
        <Nav />
        <header className="search-header">
          <div className="search-header-inner">
            <div className="search-form-wrap">
              <form className="search-form" onSubmit={this.handleSubmit}>
                <label htmlFor="location">find boba in</label>
                <input
                  type="text"
                  autoFocus
                  name="location"
                  value={this.state.searchLocation}
                  onChange={this.handleLocationInput}
                  placeholder="Enter zip or city"
                />
                <input type="submit" value="Search" disabled={!buttonEnabled} />
              </form>
            </div>
          </div>
        </header>

        {hasLocation && !loading && (
          <React.Fragment>
            {total > 0 && (
              <React.Fragment>
                <div className="search-page-wrap">
                  <div className="search-results-wrap">
                    <div className="search-results">
                      <h2>
                        <span>{indexRange}</span> of <span>{total}</span>{" "}
                        {reviewText} in <span>{location}</span>
                      </h2>
                      {results.map((result, i) => {
                        return <Business key={i} data={result} />;
                      })}
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageRanges={pageRanges}
                        rangeIndexes={rangeIndexes}
                        currentRange={currentRange}
                        updateSearchResults={this.updateSearchResults}
                        updatePaginationNext={this.updatePaginationNext}
                        updatePaginationPrev={this.updatePaginationPrev}
                      />
                    </div>
                    <div className="map">
                      <GoogleMap
                        location={location}
                        data={results}
                        currentPage={currentPage}
                      />
                    </div>
                  </div>
                </div>
                <div className="back-to-top" onClick={this.scrollPageToTop}>
                  <span className="v-align-rel">&#8593;</span>
                </div>
              </React.Fragment>
            )}

            {total < 1 && <NoBoba location={location} />}
          </React.Fragment>
        )}

        {!hasLocation && (
          <React.Fragment>
            <NoBoba location="" />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
