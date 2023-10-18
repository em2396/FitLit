import { getRandomUser, getUserData, filterUserData, averageSleepDay, specificSleepDay, getUserSleepQuality, averageSleepQuality } from './data-model';
//idk why getAverageStep is already declared if I add this onto this area.

import { displayUserInfo } from './domUpdates.js';
import { getOuncesPerDay, getDataPerWeek, getLatestData } from './hydrationFunctions.js'
import sampleData from './data/sampleData.js';
import hydration from './data/hydration.js';
import sleep from './sampleSleep.js';
import { fetchPromises } from './apiCalls.js'
import './styles.css';


//Variables Here:
let allHydrationData = hydration.hydrationData
let allSleepData = sleep.sampleSleep;
let userDataAll;
let sleepDataAll;
let hydrationDataAll;

//Event Listeners Here:
window.addEventListener('load', function () {
  Promise.all(fetchPromises).then((values) => {
    userDataAll = values[0].users;
    sleepDataAll = values[1].sleepData;
    hydrationDataAll = values[2].hydrationData;
    // console.log(userDataAll, 'user data all')
    console.log(hydrationDataAll, 'All hydration data');
    // console.log(sleepDataAll, 'sleepdataall')
    let randomIndex = getRandomUser(userDataAll);
    let currentUser = getUserData(userDataAll, randomIndex);
    let averageSteps = getAverageStepGoal(userDataAll);
    let randomHydration = filterUserData(allHydrationData, currentUser);  
    let todaysHydrationDate = getLatestData(randomHydration);
    console.log(todaysHydrationDate, 'todays hydration date');
    console.log(randomHydration, 'all hyd data from current user');
    // let hydrationFilteredData = filterUserData(allHydrationData, currentUser)
    let randomHydrationIndex = getRandomUser(randomHydration);
    let randomHydObjDate = randomHydration[randomHydrationIndex].date
    console.log(randomHydObjDate, 'this is a random date');
    let waterPerSpecificDay = getOuncesPerDay(currentUser, hydrationDataAll, randomHydObjDate)
    let waterPerDayPerWeek = getDataPerWeek(randomHydration, randomHydObjDate);
    // console.log(waterPerDayPerWeek, "waterPerDayPerWeek")
    let sleepUser = filterUserData(allSleepData, currentUser);
    let averageSleep = averageSleepDay(sleepUser);
    // let hoursSlept = specificSleepDay(sleepUser, '2023/01/14');
    let aveSleepQuality = averageSleepQuality(sleepUser);
    // getUserSleepQuality(sleepUser, '2023/01/14');
    let sleepPerDayPerWeek = getDataPerWeek(sleepUser, '2023/01/14');
    console.log(sleepPerDayPerWeek, "Sleep Quality Per Week");
    displayUserInfo(currentUser, averageSteps, waterPerSpecificDay, waterPerDayPerWeek, averageSleep, aveSleepQuality, sleepPerDayPerWeek, todaysHydrationDate);
    }); //removed hoursSlept from this function
});


function getAverageStepGoal(userSample) {
  const total = userSample.reduce((accum, user) => {
    return accum += user.dailyStepGoal;
  }, 0)
  let average = (total / userSample.length).toFixed(0);
  console.log(average)
  return average;
};