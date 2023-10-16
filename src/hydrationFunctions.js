import  hydration from '.src/data/hydration';
console.log(hydration)

// const getDailyOunces = (userId, date, dataSet) => {
//   const userHydrationData = dataSet.hydrationData.filter(userObj => userObj.userID === userId);
//   const userHydrationDataByDate = userHydrationData.find(userObj => userObj.date === date);
//   return userHydrationDataByDate.numOunces;
// }
const getAvgDailyOunces = (id, dataList) => {
  const userHydrationData = dataList.hydrationData.filter(userObj => userObj.userID === id);
  const totalOunces = userHydrationData.reduce((accum, userObj) => {
    return accum + userObj.numOunces;
  }, 0);
  const hydrAverage = Math.round(totalOunces / userHydrationData.length);
  return hydrAverage;
};

console.log(getAvgDailyOunces(1, hydration))

export default getAvgDailyOunces;