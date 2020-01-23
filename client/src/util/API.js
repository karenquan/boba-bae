// import axios from "axios";

// const API_URL = "https://api.yelp.com/v3/businesses/search";
// const API_KEY = process.env.REACT_APP_YELP_API;
// const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

// const getBusinessesByLocationOffset = (location, offset) => {
//   let url = `${PROXY_URL}${API_URL}?location=${location}&offset=${offset}`;
//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${API_KEY}`
//     },
//     params: {
//       term: "boba"
//     }
//   });
// };

const getBusinesses = async (location, offset) => {
  const response = await fetch(
    `/api/businesses?location=${location}&offset=${offset}`
  );
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export { getBusinesses };
