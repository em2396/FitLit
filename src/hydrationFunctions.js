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




export function getOuncesPerDayPerWeek(filterUser,currentUser, startDate, dataList) {
    let startDateObj = new Date(startDate); //creates a new date object by passing startDate string to Data()
    console.log("startDateObj",startDateObj)
    console.log("startDateObject with local DAte String:",startDateObj.toLocaleDateString('ar-EG')) 

    //.split
    //reverse()
    //.join
    //startDateObject: Fri Mar 24 2023 00:00:00 GMT-0400 (Eastern Daylight Time)

    //do the same for the seventhDateObj
    // let stopDateObj = new Date(startDateObj);


    //JS reads dates as numbers 2023/03/24 -> 24, 25, 26, 27
    //return enteredDate >= startDate && enteredDate <= stopDate; it'll give us the 7 days (returns everything b/t them)
    //

    // seventhDateObj.setDate(seventhDate.getDate() + 6);

    // const elementWithSevendays = currentUser.dataList.filter((user) => {
    //     let enteredDate = new Date(user.date);
    //return enteredDate >= startDate && enteredDate <= stopDate;
    // });

    
    // elementWithSevendays.map( only give fluid ounces)?
}
