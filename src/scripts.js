import { getRandomUser, getUserData, filterUserData, averageSleepDay, specificSleepDay, getUserSleepQuality, averageSleepQuality, getMilesPerDay, getMinutesPerDay, getStepGoal } from './data-model';
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
let activityDataAll;

//Event Listeners Here:
window.addEventListener('load', function () {
  Promise.all(fetchPromises).then((values) => {
    //data from Web APIs:
    userDataAll = values[0].users;
    sleepDataAll = values[1].sleepData;
    hydrationDataAll = values[2].hydrationData;
    activityDataAll = values[3].activityData;

    //random currentUser functions:
    let randomIndex = getRandomUser(userDataAll);
    let currentUser = getUserData(userDataAll, randomIndex);

    //steps function:
    let averageSteps = getAverageStepGoal(userDataAll);

    //hydration functions:
    let randomHydration = filterUserData(hydrationDataAll, currentUser);  
    let todaysHydrationDate = getLatestData(randomHydration);
    let randomHydrationIndex = getRandomUser(randomHydration);
    let randomHydObjDate = randomHydration[randomHydrationIndex].date
    let waterPerSpecificDay = getOuncesPerDay(currentUser, hydrationDataAll, randomHydObjDate)
    let waterPerDayPerWeek = getDataPerWeek(randomHydration, randomHydObjDate);

    //sleep functions:
    let sleepUser = filterUserData(sleepDataAll, currentUser);
    let randomSleepIndex = getRandomUser(sleepUser);
    let randomSleepObjDate = sleepUser[randomSleepIndex].date;
    let averageSleep = averageSleepDay(sleepUser);
    let aveSleepQuality = averageSleepQuality(sleepUser);
    let sleepPerDayPerWeek = getDataPerWeek(sleepUser, randomSleepObjDate);
    let sleepToday = getLatestData(sleepUser);

    //activity functions:
    let activityUser = filterUserData(activityDataAll, currentUser);
    let randomActivityIndex = getRandomUser(activityUser);
    let randomActivityObjDate = activityUser[randomActivityIndex].date;
    let milesPerDay = getMilesPerDay(currentUser, activityDataAll,randomActivityObjDate);
    // console.log("milesPerDay",milesPerDay)
    let minutesPerDay = getMinutesPerDay(currentUser,activityDataAll,randomActivityObjDate); 
    // console.log("minutesPerDay",minutesPerDay)
    let stepGoal = getStepGoal(currentUser,activityDataAll,randomActivityObjDate);
    // console.log("stepGoal",stepGoal)
    let activityPerDayPerWeek = getDataPerWeek(activityUser,randomActivityObjDate)
    let activityToday = getLatestData(activityUser)
    console.log("latest day",activityToday)
//First console.log(things)
//NOW UPDATE DOM with variables

    //display on DOM function:
    displayUserInfo(currentUser, averageSteps, waterPerSpecificDay, waterPerDayPerWeek, averageSleep, aveSleepQuality, sleepPerDayPerWeek, todaysHydrationDate, sleepToday, milesPerDay, minutesPerDay, stepGoal,activityPerDayPerWeek, activityToday);
    }); 
});


function getAverageStepGoal(userSample) {
  const total = userSample.reduce((accum, user) => {
    return accum += user.dailyStepGoal;
  }, 0)
  let average = (total / userSample.length).toFixed(0);
  console.log(average)
  return average;
};