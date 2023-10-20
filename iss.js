/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const url = 'https://api.ipify.org?format=json';
const fetchMyIP = function(callback) {
  request(url, function(error, responce, body) {
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

module.exports = { fetchMyIP };

// curl 'https://api.ipify.org?format=json'
// {"ip":"174.113.38.35"}