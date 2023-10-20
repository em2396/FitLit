//Return user's average fluid ounces consumed per day for all time:
///add 0 return to pass sad path test
export const getAvgDailyOunces = (id, dataList) => {
  const userHydrationData = dataList.filter((userObj) => userObj.userID === id);
  if (userHydrationData.length === 0) {
    return 0;
  }
  const totalOunces = userHydrationData.reduce((accum, userObj) => {
    return accum + userObj.numOunces;
  }, 0);
  return Math.round(totalOunces / userHydrationData.length);
};

// Return the user’s fluid ounces they consumed for a specific day:
export const getOuncesPerDay = (userObj, dataList, date) => {
  const hydrationUserId = dataList.find(dataObj => dataObj.userID === userObj.id && dataObj.date === date);
  if (hydrationUserId) {
    return hydrationUserId.numOunces;
  } else {
    return 0;
  };
};

//get ounces each day for all the week (7 days)
// Return how many fluid ounces of water a user consumed each day over the course of a week (7 days)
//return total for the week
export const getDataPerWeek = (filteredData, startDate) => {
  const total = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  let findStartDateIndex = total.findIndex(data => data.date === startDate);
  return total.splice(findStartDateIndex, 7);
};

//NEXT STEPS: add to script.js and domUpdates with innerHTML
export const getLatestData = filteredData => {
  const total = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date)
  );
  return total[0];
};
