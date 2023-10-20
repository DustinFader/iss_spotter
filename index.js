const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didnt work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP("174.113.38.35", (error, data) => {
//   if (error) {
//     console.log("It didnt work!", error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:', data);
// });

// fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, (error, data) => {
//   if (error) {
//     console.log("It didnt work!", error);
//     return;
//   }
//   console.log('It worked! Returned rise times:', data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  passTimes.forEach(element => {
    let date = new Date(element.risetime * 1000);
    console.log(`Next pass at ${date} for ${element.duration} seconds!`)
  });
});