const request = require("request");

// fetchMyIP function that will take in a callback function and return the IP address
const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(
        Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
        null
      );
      return;
    }
    // parse the body to get the IP address
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};
// fetchCoordsByIP function that will take in an IP address and callback function and return the coordinates of the IP address
const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipwho.is/` + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);
    // console.log(JSON.parse(body));
    // if the data.success is false, return an error message with the data.message and data.ip values from the JSON object
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetcing for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }
    // if the data.success is true, return the latitude and longitude values from the JSON object
    const { latitude, longitude } = data;
    // return the latitude and longitude values to the callback function
    callback(null, { latitude, longitude });
  });
};
// fetchISSFlyOverTimes function that will take in a set of coordinates and a callback function and return the flyover times of the ISS
const fetchISSFlyOverTimes = function (coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`
        ),
        null
      );
      return;
    }

    const passes = JSON.parse(body).response;
    // console.log(passes);
    callback(null, passes);
  });
};
// nextISSTimesForMyLocation function that will take in a callback function and return the flyover times of the ISS for the user's current location
const nextISSTimesForMyLocation = function (callback) {
  // call fetchMyIP function to get the IP address of the user and return the IP address to the callback function
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    // call fetchCoordsByIP function to get the coordinates of the user and return the coordinates to the callback function
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) return callback(error, null);
      // call fetchISSFlyOverTimes function to get the flyover times of the ISS and return the flyover times to the callback function
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) return callback(error, null);
        //  return the flyover times to the callback function
        callback(null, passes);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
