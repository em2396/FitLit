import { getRandomUser, getUserData, filterUserData, averageSleepDay, specificSleepDay, getUserSleepQuality, averageSleepQuality } from './data-model';

import { displayUserInfo } from './domUpdates.js';
import { getOuncesPerDay, getDataPerWeek } from './hydrationFunctions.js'
import sampleData from './data/sampleData.js';
import hydration from './data/hydration.js';
import sleep from './sampleSleep.js';
import { getData } from './apiCalls.js'
import './styles.css';


//Variables Here:
let allHydrationData = hydration.hydrationData

// const userData = userDataAll.users;
// let userData = .users;
let allSleepData = sleep.sampleSleep;

//Event Listeners Here:
window.addEventListener("load", function () {
  // console.log(userData.users.id);
  let userDataAll = null;
Promise.all([getData("users")]).then((values) => {
  userDataAll = values[0].users;
  let randomIndex = getRandomUser(userDataAll);
  console.log("userData", userDataAll, "randIndex", randomIndex)
  console.log(userDataAll);
  let currentUser = getUserData(userDataAll, randomIndex);
  let averageSteps = getAverageStepGoal(userDataAll);
  let waterPerSpecificDay = getOuncesPerDay(currentUser, allHydrationData, '2023/03/24')
  let hydrationFilteredData = filterUserData(allHydrationData, currentUser)
  let waterPerDayPerWeek = getDataPerWeek(hydrationFilteredData, '2023/03/24');
  console.log(waterPerDayPerWeek, "waterPerDayPerWeek")
  let sleepUser = filterUserData(allSleepData, currentUser);
  let averageSleep = averageSleepDay(sleepUser);
  let hoursSlept = specificSleepDay(sleepUser, '2023/01/14');
  let aveSleepQuality = averageSleepQuality(sleepUser);
  getUserSleepQuality(sleepUser, '2023/01/14');
  let sleepPerDayPerWeek = getDataPerWeek(sleepUser, '2023/01/14');
  console.log(sleepPerDayPerWeek, "Sleep Quality Per Week");
  displayUserInfo(currentUser, averageSteps, waterPerSpecificDay, waterPerDayPerWeek, averageSleep, hoursSlept, aveSleepQuality, sleepPerDayPerWeek);
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