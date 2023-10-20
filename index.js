
const { fetchMyIP, fetchCoordsByIP } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didnt work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

fetchCoordsByIP("174.113.38.35", (error, data) => {
    if (error) {
      console.log("It didnt work!", error);
      return;
    }
    console.log('It worked! Returned coordanates:', data);
  });