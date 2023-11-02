import { getRandomUser, getUserData, filterUserData, getInfoPerDay, getMinutesPerDay, getStepGoal, compareStepGoal, universalAverage, getLatestData } from './data-model.js';
import { theWaterChart, theStepChart, theActivityChart, theSleepingChart } from './charts.js'
import { displayUserInfo, displayWaterInfo, displaySleepInfo, displayActivityInfo, displayStepInfo } from './domUpdates.js';
import { fetchPromises, sendDataToAPI } from './apiCalls.js';
import { setupDraggable } from './data-model.js';
import './styles.css';


//QuerySelectors Here:
const userToggleButton = document.querySelector('.toggleButton');
const userInformation = document.querySelector('.user-info');
const waterChart = document.querySelector('#waterChart');
const stepBox = document.querySelector('#stepsBox');
const waterBox = document.querySelector('#waterBox');
const activityBox = document.querySelector('#activityBox');
const sleepBox = document.querySelector('#sleepBox');

//global
//Variables Here:
let userDataAll;
let sleepDataAll;
let activityDataAll;
export let hydrationDataAll;
export let hydrationData
export let waterChartToDom
export let currentUser

//Event Listeners Here:
window.addEventListener('DOMContentLoaded', function () {
  Promise.all(fetchPromises).then((values) => {
    //data from Web APIs:
    userDataAll = values[0].users;
    sleepDataAll = values[1].sleepData;
    activityDataAll = values[2].activityData;
    hydrationDataAll = values[3].hydrationData;

    const picker = datepicker(dateInput, {
      // onShow: instance => {
      //   console.log(instance.dateSelected)
      // },
      onSelect: (instance, date) => {
        const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
        dateInput.value = formattedDate
      },
      minDate: new Date (2023, 6, 2),
      startDate: new Date (2023, 6, 2),
      // disabledDates: [new Date(2023, 2, 24 - 2023, 6, 1)] DOESN'T WORK ?
    })
    console.log(picker, 'hello')

    //random currentUser functions:
    let randomUserIndex = getRandomUser(userDataAll);
    currentUser = getUserData(userDataAll, randomUserIndex);

    //Hydration functions:
    hydrationData = filterUserData(hydrationDataAll, currentUser);  
    let todaysHydrationDate = getLatestData(hydrationData);
    let waterPerDayPerWeek = getLatestData(hydrationData, 'week');
    waterChartToDom = theWaterChart(waterPerDayPerWeek);
    
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
    let milesPerDay = getInfoPerDay(currentUser, activityData, activityToday, "numSteps");
    let stepGoal = getStepGoal(currentUser, activityData, activityToday);
    let minutesPerDay = getInfoPerDay(currentUser, activityData, activityToday, "minutesActive"); 
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

    //dragging elements:
    setupDraggable(stepBox);
    setupDraggable(activityBox);
    setupDraggable(waterBox);
    setupDraggable(sleepBox);
});

userToggleButton.addEventListener('click',function() {
  userInformation.classList.toggle('hidden')
});

//Create an event Listener for when the button is added. This will invoke the function fetchPost which will send a post request to update data info
addButton.addEventListener('click', function(event) {
  event.preventDefault()
  sendDataToAPI(currentUser)
})

