import { getRandomUser, getUserData, filterUserData, averageSleepDay, averageSleepQuality, getMilesPerDay, getMinutesPerDay, getStepGoal, getAverageStepGoal, theWaterFunction, stepChart, activityChart, theSleepingFunction } from './data-model.js';
import { getOuncesPerDay, getDataPerWeek, getLatestData } from './hydrationFunctions.js';
import { displayUserInfo } from './domUpdates.js';
import { fetchPromises } from './apiCalls.js';
import './styles.css';

//QuerySelectors Here:
const locationToggleButton = document.querySelector('.toggleButton');
const addressInfo = document.querySelector('.location');

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
    // console.log(currentUser, 'currentuserobj')


    //steps function:
    let averageSteps = getAverageStepGoal(userDataAll);

    //hydration functions:
    let hydrationData = filterUserData(hydrationDataAll, currentUser);  
    let todaysHydrationDate = getLatestData(hydrationData);
    let waterPerDayPerWeek = getLatestData(hydrationData, 'week');
    let waterChartToDom = theWaterFunction(waterPerDayPerWeek);
    // let randomHydrationIndex = getRandomUser(hydrationData);
    // let randomHydrationDate = hydrationData[randomHydrationIndex].date;
    // let waterPerSpecificDay = getOuncesPerDay(currentUser, hydrationDataAll, randomHydrationDate);
    //waterPerDayPerWeek = getDataPerWeek()
    // console.log(waterPerDayPerWeek, 'water data')

    //sleep functions:
    let sleepData = filterUserData(sleepDataAll, currentUser);
    let averageSleep = averageSleepDay(sleepData);
    let aveSleepQuality = averageSleepQuality(sleepData);
    let sleepPerDayPerWeek = getLatestData(sleepData, 'week');
    let sleepToday = getLatestData(sleepData);
    let sleepChartToDom = theSleepingFunction(sleepPerDayPerWeek);
    // let randomSleepIndex = getRandomUser(sleepData);
    // let randomSleepDate = sleepData[randomSleepIndex].date;

    //activity functions:
    let activityData = filterUserData(activityDataAll, currentUser);
    let activityPerDayPerWeek = getLatestData(activityData,'week');
    let activityToday = getLatestData(activityData);
    // console.log(activityToday, 'act today')
    let milesPerDay = getMilesPerDay(currentUser, activityData, activityToday);
    let stepGoal = getStepGoal(currentUser, activityData, activityToday);
    let minutesPerDay = getMinutesPerDay(activityData, activityToday); 
    let stepChartToDom = stepChart(activityPerDayPerWeek);
    let activityChartToDom = activityChart(activityPerDayPerWeek);
    // let randomActivityIndex = getRandomUser(activityData);
    // let randomActivityDate = activityData[randomActivityIndex].date;

    //display on DOM function:
    displayUserInfo(currentUser, averageSteps, waterPerDayPerWeek, averageSleep, aveSleepQuality, sleepPerDayPerWeek, todaysHydrationDate, sleepToday, milesPerDay, minutesPerDay, stepGoal, activityPerDayPerWeek, activityToday, waterChartToDom, stepChartToDom, activityChartToDom, sleepChartToDom);
    }); 
});

locationToggleButton.addEventListener('click',function() {
  addressInfo.classList.toggle('hidden')
});

