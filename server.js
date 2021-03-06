const express = require("express");
const app = express();
const fetch = require("node-fetch");
const port = process.env.PORT || 5000;
const path = require("path");

require("dotenv").config();

const YELP_API_URL = "https://api.yelp.com/v3/businesses/search?term=boba";
const YELP_API_KEY = process.env.YELP_API;
const GOOGLE_MAP_API_KEY = process.env.GOOGLEMAP_API;

let headers = {
  Authorization: `Bearer ${YELP_API_KEY}`
};

// Console.log that server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// GET boba businesses by location and offset
app.get("/api/businesses", (req, res) => {
  let url = `${YELP_API_URL}&offset=${req.query.offset}&location=${req.query.location}`;
  fetch(url, { method: "GET", headers: headers })
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

// GET Google Maps API key
app.get("/api/googleMapKey", (req, res) => {
  let key = GOOGLE_MAP_API_KEY;
  res.send({ key: key });
});

// Deployment
// https://blog.bitsrc.io/react-production-deployment-part-3-heroku-316319744885
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  // app.use("/", express.static(path.join(__dirname, "/client/build")));
  // app.use(express.static(path.join(__dirname, "/client/build")));
  app.use(express.static("client/build"));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}
