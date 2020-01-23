import React from "react";
import * as helpers from "../util/helpers";
import YelpLogo from "../images/yelp-logo.png";
import "../styles/business.scss";

const Business = props => {
  // get business info
  const {
    name,
    phone,
    display_phone,
    image_url,
    location,
    url,
    review_count,
    rating
  } = props.data;

  return (
    <div className="business">
      <div className="business-inner">
        <div className="business-pic-wrap">
          <div
            className="business-pic"
            style={{ backgroundImage: `url(${image_url})` }}
          ></div>
        </div>

        <div className="business-info">
          <h3>{name}</h3>

          {typeof display_address !== undefined && (
            <div className="address">
              {// separate address into diff lines
              helpers
                .formatAddressNewLine(location.display_address)
                .split("\n")
                .map((addressLine, i) => {
                  return <p key={i}>{addressLine}</p>;
                })}
            </div>
          )}

          {typeof phone !== undefined && (
            <p className="phone">{display_phone}</p>
          )}

          <div className="stars">
            {helpers.getReviewStarsImg(rating)}
            {review_count > 0 && (
              <span>&nbsp; &bull; {helpers.getReviewText(review_count)}</span>
            )}
          </div>
        </div>
      </div>
      <p className="yelp-wrap">
        {/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
        Read more on{" "}
        <img src={YelpLogo} alt="Yelp logo" className="yelp-logo" />
        {/* </a> */}
      </p>
      <a
        href={url}
        className="cover-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more on Yelp
      </a>
    </div>
  );
};

export default Business;
