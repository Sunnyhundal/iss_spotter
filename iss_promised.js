const request = require("request-promise-native");
// const { nextISSTimesForMyLocation } = require("./iss");


const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/` + ip);
};

const fetchISSFlyOverTimes = function (coords) {
  const latitude = JSON.parse(coords).latitude;
  const longitude = JSON.parse(coords).longitude;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((info) => {
      const { response } = JSON.parse(info );
      return response;
    });

}

module.exports = {  nextISSTimesForMyLocation };
