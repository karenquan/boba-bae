import React from "react";
import "../styles/loading-screen.scss";
import gif from "../images/remove-boba.gif";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <img src={gif} alt="animated boba" />
        <h2>Searching for boba...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
