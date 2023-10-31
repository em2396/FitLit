import { getRandomUser, getUserData, filterUserData, getMilesPerDay, getMinutesPerDay, getStepGoal, theWaterChart, theStepChart, theActivityChart, theSleepingChart, compareStepGoal, universalAverage, getLatestData, getInfoPerDay } from './data-model.js';
// import {  } from './hydrationFunctions.js';
import { displayUserInfo, displayWaterInfo, displaySleepInfo, displayActivityInfo, displayStepInfo } from './domUpdates.js';
import { fetchPromises } from './apiCalls.js';
import './styles.css';

//QuerySelectors Here:
const userToggleButton = document.querySelector('.toggleButton');
const userInformation = document.querySelector('.user-info');

//Variables Here:
let userDataAll;
let sleepDataAll;
let hydrationDataAll;
let activityDataAll;

//Event Listeners Here:
window.addEventListener('load', function () {
  Promise.all(fetchPromises).then((values) => {
    //data from Web APIs:
    console.log(values);
    userDataAll = values[0].users;
    sleepDataAll = values[1].sleepData;
    activityDataAll = values[2].activityData;
    hydrationDataAll = values[3].hydrationData;

    //random currentUser functions:
    let randomUserIndex = getRandomUser(userDataAll);
    let currentUser = getUserData(userDataAll, randomUserIndex);
 
    //Hydration functions:
    let hydrationData = filterUserData(hydrationDataAll, currentUser);  
    console.log(hydrationData)
    let todaysHydrationDate = getLatestData(hydrationData);
    let waterPerDayPerWeek = getLatestData(hydrationData, 'week');
    let waterChartToDom = theWaterChart(waterPerDayPerWeek);
    
    //Sleep functions:
    let sleepData = filterUserData(sleepDataAll, currentUser);
    let averageSleep = universalAverage(sleepData, 'hoursSlept');
    let aveSleepQuality = universalAverage(sleepData, 'sleepQuality');
    let sleepPerDayPerWeek = getLatestData(sleepData, 'week');
    let sleepToday = getLatestData(sleepData);
    let sleepChartToDom = theSleepingChart(sleepPerDayPerWeek);
    
    //Activity and Step functions:
    let averageSteps = universalAverage(userDataAll, 'dailyStepGoal');
    let activityData = filterUserData(activityDataAll, currentUser);
    let activityPerDayPerWeek = getLatestData(activityData,'week');
    let activityToday = getLatestData(activityData);
    // let milesPerDay = getMilesPerDay(currentUser, activityData, activityToday);
    let milesPerDay = getInfoPerDay(currentUser, activityData, activityToday, 'numSteps')
    let stepGoal = getStepGoal(currentUser, activityData, activityToday);
    // let minutesPerDay = getMinutesPerDay(activityData, activityToday); 
    let minutesPerDay = getInfoPerDay(currentUser, activityData, activityToday, 'minutesActive')
    let stepChartToDom = theStepChart(activityPerDayPerWeek);
    let activityChartToDom = theActivityChart(activityPerDayPerWeek);
    let compareSteps = compareStepGoal(currentUser, userDataAll);

    //Dom Updates functions:
    displayUserInfo(currentUser, activityToday);
    displayWaterInfo(todaysHydrationDate, waterChartToDom);
    displaySleepInfo(averageSleep, aveSleepQuality, sleepToday, sleepChartToDom);
    displayActivityInfo(milesPerDay, minutesPerDay, activityToday, activityChartToDom);
    displayStepInfo(currentUser, stepGoal, stepChartToDom, compareSteps, averageSteps);
    }); 
});

userToggleButton.addEventListener('click',function() {
  userInformation.classList.toggle('hidden')
});

