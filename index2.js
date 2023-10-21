const { nextISSTimesForMyLocation  } = require('./iss_promised')

// fetchMyIP2().then(fetchCoordsByIP).then(nextISSTimesForMyLocation).then((fly) => {
//   console.log(fly)
// })

nextISSTimesForMyLocation().then((fly) => {
  console.log(fly)
}).catch((error) => {
  console.log("It didn't work: ", error.message);
})