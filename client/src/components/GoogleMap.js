import React, { Component } from "react";
import * as helpers from "../util/helpers";
import * as API from "../util/API";
import YelpLogo from "../images/yelp-logo.png";
import "../styles/google-map.scss";

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    let { data, location, currentPage } = this.props;
    // Initialize initial state from props
    this.state = { data: data, location: location, currentPage: currentPage };
  }

  componentDidUpdate(prevProps) {
    // Update map if location or page number has changed
    if (
      prevProps.location !== this.props.location ||
      prevProps.currentPage !== this.props.currentPage
    ) {
      this.initMap();
    }
  }

  // State depends on prop change
  static getDerivedStateFromProps(props) {
    return {
      data: props.data
    };
  }

  // Initialize Google Map
  initMap = () => {
    let { data } = this.state;

    // Create map
    let map = new window.google.maps.Map(
      document.getElementById("google-map"),
      {
        center: {
          lat: data[0].coordinates.latitude,
          lng: data[0].coordinates.longitude
        },
        zoomControl: true
      }
    );

    // Create info window
    let infoWindow = new window.google.maps.InfoWindow({});

    //Create LatLngBounds object
    let latLngBounds = new window.google.maps.LatLngBounds();

    // Loop through locations to add map markers
    for (var i = 0; i < data.length; i++) {
      let business = data[i];

      let latLng = new window.google.maps.LatLng(
        business.coordinates.latitude,
        business.coordinates.longitude
      );

      // Custom marker icon
      let icon = {
        url: "/images/boba.svg",
        scaledSize: new window.google.maps.Size(12, 20), // scaled size
        origin: new window.google.maps.Point(0, 0), // origin
        anchor: new window.google.maps.Point(0, 0) // anchor
      };

      let marker = new window.google.maps.Marker({
        id: business.id,
        position: latLng,
        map: map,
        icon: icon
      });

      // Display info window
      marker.addListener("click", function() {
        let { location, name, image_url, url, rating, review_count } = business;
        let address = helpers.formatAddressLineBreak(location.display_address);
        let starImg = helpers.convertReactImgToString(
          helpers.getReviewStarsImg(rating)
        );
        let reviewText =
          review_count > 1
            ? `&bull; ${helpers.getReviewText(review_count)}`
            : "";
        let htmlString = `
          <div class="gmap-info-wrap">
            <div class="info-window-pic" style="background-image:url(${image_url})"></div>
            <h3>${name}</h3>
            <p class="info-window-address">${address}</p>
            <p class="info-window-reviews">${starImg} ${reviewText}</p>
            <p class="info-window-yelp"><span>View on</span> <img src=${YelpLogo} alt="Yelp logo" class="yelp-logo" /></p>
            <a href=${url} class="cover-link" target="_blank" rel="noopener noreferrer">View on Yelp</a>
            </div>`;
        infoWindow.setContent(htmlString);
        infoWindow.open(map, marker);
      });

      //Extend each marker's position in LatLngBounds object
      latLngBounds.extend(marker.position);
    }

    //Center map and adjust Zoom based on the position of all markers.
    map.setCenter(latLngBounds.getCenter());
    map.fitBounds(latLngBounds);
  };

  // Add Google Map script & initialize map
  addMap = () => {
    if (!window.google) {
      // Get Google Map API key
      API.getGoogleMapKey().then(result => {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = `https://maps.google.com/maps/api/js?key=${result.key}`;
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
        // Below is important.
        //We cannot access google.maps until it's finished loading
        s.addEventListener("load", e => {
          this.initMap();
        });
      });
    } else {
      this.initMap();
    }
  };

  componentDidMount() {
    this.addMap();
  }

  render() {
    return <div id="google-map"></div>;
  }
}

export default GoogleMap;
