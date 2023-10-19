import { getRandomUser, getUserData, filterUserData, averageSleepDay,averageSleepQuality, getMilesPerDay, getMinutesPerDay, getStepGoal, getAverageStepGoal } from './data-model';

import { displayUserInfo } from './domUpdates.js';
import { getOuncesPerDay, getDataPerWeek, getLatestData } from './hydrationFunctions.js';
import { fetchPromises } from './apiCalls.js';
import './styles.css';


//Variables Here:
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
    let randomUserIndex = getRandomUser(userDataAll);
    let currentUser = getUserData(userDataAll, randomUserIndex);

    //steps function:
    let averageSteps = getAverageStepGoal(userDataAll);

    //hydration functions:
    let randomHydrationData = filterUserData(hydrationDataAll, currentUser);  
    let todaysHydrationDate = getLatestData(randomHydrationData);
    let randomHydrationIndex = getRandomUser(randomHydrationData);
    let randomHydrationDate = randomHydrationData[randomHydrationIndex].date;
    let waterPerSpecificDay = getOuncesPerDay(currentUser, hydrationDataAll, randomHydrationDate);
    let waterPerDayPerWeek = getDataPerWeek(randomHydrationData, randomHydrationDate);

    //sleep functions:
    let randomSleepData = filterUserData(sleepDataAll, currentUser);
    let randomSleepIndex = getRandomUser(randomSleepData);
    let randomSleepDate = randomSleepData[randomSleepIndex].date;
    let averageSleep = averageSleepDay(randomSleepData);
    let aveSleepQuality = averageSleepQuality(randomSleepData);
    let sleepPerDayPerWeek = getDataPerWeek(randomSleepData, randomSleepDate);
    let sleepToday = getLatestData(randomSleepData);

    //activity functions:
    let randomActivityData = filterUserData(activityDataAll, currentUser);
    let randomActivityIndex = getRandomUser(randomActivityData);
    let randomActivityDate = randomActivityData[randomActivityIndex].date;
    let milesPerDay = getMilesPerDay(currentUser, activityDataAll,randomActivityDate);
    let minutesPerDay = getMinutesPerDay(currentUser, activityDataAll,randomActivityDate); 
    let stepGoal = getStepGoal(currentUser, activityDataAll, randomActivityDate);
    let activityPerDayPerWeek = getDataPerWeek(randomActivityData,randomActivityDate);
    let activityToday = getLatestData(randomActivityData);

    //display on DOM function:
    displayUserInfo(currentUser, averageSteps, waterPerDayPerWeek, averageSleep, aveSleepQuality, sleepPerDayPerWeek, todaysHydrationDate, sleepToday, milesPerDay, minutesPerDay, stepGoal, activityPerDayPerWeek, activityToday);
    }); 
});


