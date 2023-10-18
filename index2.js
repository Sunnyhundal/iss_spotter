// const { fetchMyIP } = require("./iss_promised");
// const { fetchCoordsByIP } = require("./iss_promised");
// const { fetchISSFlyOverTimes } = require("./iss_promised");
const { nextISSTimesForMyLocation } = require("./iss_promised");

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((body) => console.log(body));

const printPassTimes = function (passTimes) {
  // for of loop to iterate through the passTimes array and print out the rise time and duration of each pass
  for (const pass of passTimes) {
    const date_time = new Date(0);
    date_time.setUTCSeconds(pass.rise_time);
    const duration = pass.duration;
    console.log(`Next pass at ${date_time} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});
