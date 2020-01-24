import React, { Component } from "react";
import "../styles/home.scss";
import bobaSvg from "../images/boba.svg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      loading: false
    };
  }

  // Handler for location search boxzxx
  handleLocationInput = evt => {
    this.setState({ location: evt.target.value });
  };

  // Search box validation
  canBeSubmitted = () => {
    const { location } = this.state;
    return location.length > 0;
  };

  // Search button handler
  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }

    evt.preventDefault();
    this.props.history.push("/search", {
      searchLocation: this.state.location,
      loading: true
    });
  };

  render() {
    const { location } = this.state;
    const buttonEnabled = location.length > 0;

    return (
      <div className="home-wrap">
        <div className="home-intro v-align-rel">
          <img src={bobaSvg} alt="boba cup" className="logo" />
          <h1>Boba Bae</h1>
          <h2>Let's get boba!</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="location">Search</label>
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleLocationInput}
              placeholder="Enter zip or city"
            />
            <input type="submit" value="Find boba" disabled={!buttonEnabled} />
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
