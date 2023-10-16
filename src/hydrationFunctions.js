import hydrationData from './data/hydration';
import getUserData from './data-model';
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
export function getOuncesPerDay(dataList, date) {
    const hydrationDay = dataList.find((userObj) => {
        return userObj.date === date  //returns truthy so keepts object that has date. Then call below.
        })
    return hydrationDay.numOunces
};

//Mary's psuedocode:
// const getDailyOunces = (userId, date, hydrationData) => {
//     const userHydrationData = hydrationData.filter(userObj => userObj.userID === userId);
//     const userHydrationDataByDate = userHydrationData.find(userObj => userObj.date === date);
//     return userHydrationDataByDate.numOunces;
//     }git 


// //get ounces each day for all the week (7 days)
// export function getOuncesPerDayPerWeek(currentUser, startDate, dataList) {
//     let startDate = new Date(startDate); //creates a new date object by passing startDate string to Data()
//     let seventhDate = new Date(startDateObj);
//     seventhDate.setDate(seventhDate.getDate() + 6);

//     return currentUser.dataList.filter((user) => {
//         let enteredDate = new Date(user.date);
//         return enteredDate >= startDate && enteredDate <= seventhDate;
//     });
// }

// export default {
//     getAvgDailyOunces,
//     getOuncesPerDay,
//     getOuncesPerDayPerWeek,
// } 