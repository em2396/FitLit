
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

export function displayUserInfo(currentUser,averageSteps,waterPerSpecificDay, waterPerDayPerWeek, averageSleep) {
  userName.innerText = `${currentUser.name}`;
  location.innerText = `${currentUser.address}`;
  welcomeBack.innerText = `Welcome Back, ${currentUser.firstName}!`;
  steps.innerText = `Step Goal: ${currentUser.dailyStepGoal}`;
  usersAvgSteps.innerText = `The average users step goal: ${averageSteps}`;
  waterConsumedToday.innerText = `Water Consumed Today: ${waterPerSpecificDay}oz`
  waterPerDayPerWeek.forEach((data) => {
    waterConsumedPerWeek.innerHTML += `<p> Water Consumed on first day ${data.numOunces}oz`
  });
  averageSleepOverall.innerText = `Average Overall Sleep: ${averageSleep}`;
};
