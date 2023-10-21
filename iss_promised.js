const request = require('request-promise-native');

// fetches your ip returning as a JSON string
const fetchMyIP = () => {
  return request(`https://api.ipify.org?format=json`)
}

// fetches coordanates based on ip given
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipwho.is/${ip}`)
}

// fetches the flyover times based on coordanates given
const fetchISSFlyOverTimes = (body) => {
  const lat = JSON.parse(body).latitude;
  const lon = JSON.parse(body).longitude;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`)
}

// returns flyover times based on your ip converted into coordanates
const nextISSTimesForMyLocation = () => {
  return fetchMyIP().then(fetchCoordsByIP).then(fetchISSFlyOverTimes).then((body) => {
    return JSON.parse(body).response
  })
}

module.exports = { nextISSTimesForMyLocation };