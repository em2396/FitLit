import { getRandomUser, getUserData, filterUserData, getInfoPerDay, getStepGoal, compareStepGoal, universalAverage, getLatestData } from './data-model.js';
import { waterChart, stepChart, activityChart, sleepingChart } from './charts.js'
import { displayUserInfo, displayWaterInfo, displaySleepInfo, displayActivityInfo, displayStepInfo } from './domUpdates.js';
import { fetchPromises, sendDataToAPI } from './apiCalls.js';
import { setupDraggable } from './data-model.js';
import './styles.css';


//QuerySelectors Here:
const userToggleButton = document.querySelector('.toggleButton');
const userInformation = document.querySelector('.user-info');
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
export let hydrationData;
export let waterChartToDom;
export let currentUser;

//Event Listeners Here:
window.addEventListener('DOMContentLoaded', function () {
  Promise.all(fetchPromises).then((values) => {
    //data from Web APIs:
    userDataAll = values[0].users;
    sleepDataAll = values[1].sleepData;
    activityDataAll = values[2].activityData;
    hydrationDataAll = values[3].hydrationData;

    const picker = datepicker(dateInput, {
      onSelect: (instance, date) => {
        const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
        dateInput.value = formattedDate
        picker.calendarContainer.style.setProperty('font-size', '1.5rem')
      },
      minDate: new Date (2023, 6, 2),
      startDate: new Date (2023, 6, 2),
    })

    //random currentUser functions:
    const randomUserIndex = getRandomUser(userDataAll);
    currentUser = getUserData(userDataAll, randomUserIndex);

    //Hydration functions:
    hydrationData = filterUserData(hydrationDataAll, currentUser);  
    const todaysHydrationDate = getLatestData(hydrationData);
    const waterPerDayPerWeek = getLatestData(hydrationData, 'week');
    waterChartToDom = waterChart(waterPerDayPerWeek);
    
    //Sleep functions:
    const sleepData = filterUserData(sleepDataAll, currentUser);
    const averageSleep = universalAverage(sleepData, 'hoursSlept');
    const aveSleepQuality = universalAverage(sleepData, 'sleepQuality');
    const sleepPerDayPerWeek = getLatestData(sleepData, 'week');
    const sleepToday = getLatestData(sleepData);
    const sleepChartToDom = sleepingChart(sleepPerDayPerWeek);
    
    //Activity and Step functions:
    const averageSteps = universalAverage(userDataAll, 'dailyStepGoal');
    const activityData = filterUserData(activityDataAll, currentUser);
    const activityPerDayPerWeek = getLatestData(activityData,'week');
    const activityToday = getLatestData(activityData);
    const milesPerDay = getInfoPerDay(currentUser, activityData, activityToday, "numSteps");
    const stepGoal = getStepGoal(currentUser, activityData, activityToday);
    const minutesPerDay = getInfoPerDay(currentUser, activityData, activityToday, "minutesActive"); 
    const stepChartToDom = stepChart(activityPerDayPerWeek);
    const activityChartToDom = activityChart(activityPerDayPerWeek);
    const compareSteps = compareStepGoal(currentUser, userDataAll);

    //Dom Updates functions:
    displayUserInfo(currentUser, activityToday);
    displayWaterInfo(todaysHydrationDate, waterChartToDom);
    displaySleepInfo(averageSleep, aveSleepQuality, sleepToday, sleepChartToDom);
    displayActivityInfo(milesPerDay, minutesPerDay, activityToday, activityChartToDom);
    displayStepInfo(currentUser, stepGoal, stepChartToDom, compareSteps, averageSteps);
    }); 

    //Dragging elements:
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
});

