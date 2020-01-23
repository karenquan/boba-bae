import React from "react";

// Create array of lat & lng objects of an array of business objects
const getLocationCoords = locations => {
  let locationCoords = [];
  for (var i = 0; i < locations.length; i++) {
    locationCoords.push(locations[i].coordinates);
  }

  return locationCoords;
};

// Get text for reviews
const getReviewText = reviewCount => {
  return reviewCount > 1 ? `${reviewCount} reviews` : `${reviewCount} review`;
};

// Get Yelp rating star image
const getReviewStarsImg = rating => {
  if (rating === 1) {
    return <img src="/images/yelp-stars/1.png" alt="1 star" />;
  } else {
    let _rating = rating.toString().replace(".", "-");
    return (
      <img src={`/images/yelp-stars/${_rating}.png`} alt={`${rating} stars`} />
    );
  }
};

// Format business address with new line
const formatAddressNewLine = displayAddress => {
  let address = "";
  for (var i = 0; i < displayAddress.length; i++) {
    address += displayAddress[i] + "\n";
  }

  return address;
};

// Format business address with line break tag
const formatAddressLineBreak = displayAddress => {
  let address = "";
  for (var i = 0; i < displayAddress.length; i++) {
    address += displayAddress[i] + "<br />";
  }

  return address;
};

// Convert React image to string
let convertReactImgToString = reactImg => {
  let { src, alt } = reactImg.props;
  return `<img src=${src} alt=${alt} />`;
};

// Scroll page to top (options are auto or smooth)
let scrollPageToTop = option => {
  window.scrollTo({ top: 0, behavior: option });
};

export {
  getLocationCoords,
  getReviewText,
  getReviewStarsImg,
  formatAddressNewLine,
  formatAddressLineBreak,
  convertReactImgToString,
  scrollPageToTop
};
