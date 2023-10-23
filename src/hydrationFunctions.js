//Return user's average fluid ounces consumed per day for all time:
export const getAvgDailyOunces = (hydrationData) => {
  if (hydrationData.length === 0) {
    return 0;
  }
  const totalOunces = hydrationData.reduce((accum, userObj) => {
    return accum + userObj.numOunces;
  }, 0);
  return Math.round(totalOunces / hydrationData.length);
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

// Return how many fluid ounces of water a user consumed each day over the course of a week (7 days)
//return total for the week
export const getDataPerWeek = (filteredData, startDate) => {
  const total = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  let findStartDateIndex = total.findIndex(data => data.date === startDate);
  return total.splice(findStartDateIndex, 7);
};

export const getLatestData = (filteredData, wholeWeek) => {
  let total;
  if (wholeWeek === 'week') {
    total = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return total.slice(0, 7);
  } else {
  total = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log(total, 'total objects')
  return total[0];
  }
};
