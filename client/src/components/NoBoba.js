import React from "react";
import EmptyBoba from "../images/empty-boba.svg";
import "../styles/no-boba.scss";

const NoBoba = props => {
  let { location } = props;
  let error_text = location
    ? `No boba found in "${location}".`
    : "No boba here!";
  let suggestion_text = location
    ? "Try entering another zip or city into the search box."
    : "Try entering a zip or city into the search box.";

  return (
    <div className="no-boba-wrap">
      <div className="no-boba-inner v-align-rel">
        <img src={EmptyBoba} alt="Empty boba cup" />
        <p>{error_text}</p>
        <p>{suggestion_text}</p>
      </div>
    </div>
  );
};

export default NoBoba;
