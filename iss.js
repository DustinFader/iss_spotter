const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const url = 'https://api.ipify.org?format=json';
const fetchMyIP = function (callback) {
  request(url, function (error, responce, body) {
    if (error) {
      callback(error, null);
      return;
    }

    if (responce.statusCode !== 200) {
      const msg = `Status Code ${responce.statusCode} when fetching IP. Responce: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function (ip, callback) {
  request("https://ipwho.is/" + ip + "?fields=latitude,longitude,success,message", function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
*/
const fetchISSFlyOverTimes = function (coords, callback) {
  const flyOverUrl = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(flyOverUrl, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching with ${JSON.stringify(coords)}. Responce: ${body}.`;
      callback(Error(msg), null);
      return;
    }

    const risetimes = JSON.parse(body).response;
    callback(null, risetimes);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null)
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null)
      }

      fetchISSFlyOverTimes(coordinates, (error, riseTimes) => {
        if (error) {
          return callback(error, null)
        }

        callback(null, riseTimes);
        // console.log('It worked! Returned rise times:', riseTimes);
      });
    });
  });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };