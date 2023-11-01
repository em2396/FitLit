import { getRandomUser, getUserData, filterUserData, getStepGoal, compareStepGoal, universalAverage, getLatestData, getInfoPerDay, sendDataToAPI } from './data-model.js';
import { theWaterChart, theStepChart, theActivityChart, theSleepingChart } from './charts.js'


import { displayUserInfo, displayWaterInfo, displaySleepInfo, displayActivityInfo, displayStepInfo } from './domUpdates.js';
import { fetchPromises, fetchPosts } from './apiCalls.js';
import { fetchPromises, fetchPosts } from './apiCalls.js';
import './styles.css';

//QuerySelectors Here:
const userToggleButton = document.querySelector('.toggleButton');
const userInformation = document.querySelector('.user-info');
const addButton = document.querySelector('#addButton');
const dateInput = document.querySelector('#dateInput');
const ouncesInput = document.querySelector('#ouncesInput');
const addButton = document.querySelector('#addButton');
const dateInput = document.querySelector('#dateInput');
const ouncesInput = document.querySelector('#ouncesInput');

//Variables Here:
let userDataAll;
let sleepDataAll;
let hydrationDataAll;
let activityDataAll;
// let hydrationData;
let currentUser

// let hydrationData;
let currentUser


//Event Listeners Here:
window.addEventListener('load', function () {
  Promise.all(fetchPromises).then((values) => {
    //data from Web APIs:
    // console.log(values, 'API values')
    // console.log(values, 'API values')
    userDataAll = values[0].users;
    sleepDataAll = values[1].sleepData;
    activityDataAll = values[2].activityData;
    hydrationDataAll = values[3].hydrationData;
    
    activityDataAll = values[2].activityData;
    hydrationDataAll = values[3].hydrationData;
    
    //random currentUser functions:
    let randomUserIndex = getRandomUser(userDataAll);
    currentUser = getUserData(userDataAll, randomUserIndex);
    console.log(currentUser, 'current')
    
    currentUser = getUserData(userDataAll, randomUserIndex);
    console.log(currentUser, 'current')
    
    //Hydration functions:
    let hydrationData = filterUserData(hydrationDataAll, currentUser);  
    let todaysHydrationDate = getLatestData(hydrationData);
    // console.log(todaysHydrationDate, 'today')
    // console.log(todaysHydrationDate, 'today')
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

//Create an event Listener for when the button is added. This will invoke the function fetchPost which will send a post request to update data info
addButton.addEventListener('click', function(event) {
  event.preventDefault()
  sendDataToAPI(currentUser)
  setTimeout(console.log(userDataAll), 2000)
})

//Create an event Listener for when the button is added. This will invoke the function fetchPost which will send a post request to update data info
addButton.addEventListener('click', function(event) {
  event.preventDefault()
  sendDataToAPI(currentUser)
  setTimeout(console.log(userDataAll), 2000)
})

