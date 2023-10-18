
// const { userSample } = require("./data/sampleData");
// import sampleData from './data/sampleData';
// // const { getRandomUser, getUserData, getAverageStepGoal } = require("./data-model.js");
// import { getRandomUser, getUserData, getAverageStepGoal } from './data-model.js'


const userName = document.querySelector('#username');
const location = document.querySelector('#location');
const hello = document.querySelector('#progressRightSide');
const welcomeBack = document.querySelector('#welcomeBack');
const steps = document.querySelector('#totalSteps');
let usersAvgSteps = document.querySelector('#averageUsersSteps');
let waterConsumedToday = document.querySelector('#waterConsumedToday');
let waterConsumedPerWeek = document.querySelector('#waterEachDayOfWeek');
const averageSleepOverall = document.querySelector('#averageSleepOverall');
const sleepSpecificDay = document.querySelector('#sleepSpecificDay');
const sleepPerWeek = document.querySelector('#sleepPerDayPerWeek')

export function displayUserInfo(currentUser,averageSteps,waterPerSpecificDay, waterPerDayPerWeek, averageSleep, hoursSlept,  aveSleepQuality, sleepPerDay, sleepPerDayPerWeek ) {
  userName.innerText = `${currentUser.name}`;
  location.innerText = `${currentUser.address}`;
  welcomeBack.innerText = `Welcome Back, ${currentUser.firstName}!`;
  steps.innerText = `Step Goal: ${currentUser.dailyStepGoal}`;
  usersAvgSteps.innerText = `The average users step goal: ${averageSteps}`;
  waterConsumedToday.innerText = `Water Consumed Today: ${waterPerSpecificDay}oz`
  waterPerDayPerWeek.forEach((data) => {
    waterConsumedPerWeek.innerHTML += `<p> Water Consumed on first day ${data.numOunces}oz`
  });
//should be able to see my all-time average sleep quality and all-time average number of hours slept:
  averageSleepOverall.innerText = `Average Overall Sleep: ${averageSleep} and Average Sleep Quality: ${aveSleepQuality}`;

// As a user, I should be able to see my sleep data over the course of the latest week (hours slept and quality of sleep)
  sleepPerDayPerWeek.forEach((data) => {
    sleepPerWeek.innerHTML += `<p> On ${data.date}, user slept for ${data.hoursSlept} hours with sleep quality of ${data.sleepQuality}`
  });
  sleepSpecificDay.innerText = hoursSlept;

//  should be able to see my sleep data for the latest day (hours slept and quality of sleep)
//NEXT STEP: have to create a function to find the sleep data for latest day!
};
