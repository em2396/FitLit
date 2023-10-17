import hydrationData from './data/hydration';
import { getRandomUser, getUserData } from './data-model';
import './styles.css';

//return user's average fluid ounces consumed per day for all time:
export const getAvgDailyOunces = (id, dataList) => {
  const userHydrationData = dataList.filter(userObj => userObj.userID === id);
  const totalOunces = userHydrationData.reduce((accum, userObj) => {
    return accum + userObj.numOunces;
  }, 0);
  const hydrAverage = Math.round(totalOunces / userHydrationData.length);
  return hydrAverage;
};

// Return the user’s fluid ounces they consumed for a specific day:
export function getOuncesPerDay(userObj, dataList, date) {
    const hydrationUserId = dataList.find((dataObj) => dataObj.userID === userObj.id && dataObj.date === date)
    console.log("ounces",hydrationUserId.numOunces)
    return hydrationUserId.numOunces
};

//get ounces each day for all the week (7 days)
// Return how many fluid ounces of water a user consumed each day over the course of a week (7 days)
//return total for the week

export function getOuncesPerWeek(filteredData, startDate) {
    const total = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date))
    let findStartDateIndex = total.findIndex((data) => data.date === startDate)
    let totalWeek = total.splice((findStartDateIndex),7)
    return totalWeek;
  }