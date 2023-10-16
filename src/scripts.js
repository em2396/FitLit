import { displayUserInfo } from './domUpdates.js';
import getAvgDailyOunces  from './hydrationFunctions.js'
import   sampleData   from './data/sampleData';
import hydrationData from './data/hydration.js';
import './styles.css';
console.log(hydrationData.hydrationData);
console.log(getAvgDailyOunces(1, hydrationData.hydrationData))
//QuerySelectors Here:
const userName = document.querySelector('#username');
const location = document.querySelector('#location');
const hello = document.querySelector('#progressRightSide');

//Variables Here:
let userData = sampleData.sampleUsers;
let welcome;

//Event Listeners Here:
window.addEventListener("load", function () {
  let randomIndex = getRandomUser(userData);
  let currentUser = getUserData(userData, randomIndex);
  const averageSteps = getAverageStepGoal(userData);
  displayUserInfo(currentUser, averageSteps);
  displayUserInfo(currentUser, averageSteps);
  getAverageStepGoal(userData);
});


function getAverageStepGoal(userSample) {
    const total = userSample.reduce((accum,user) => {
        return accum += user.dailyStepGoal;
    }, 0)
    let average = (total / userSample.length).toFixed(0);
    console.log(average)
    return average; 
};

  export default {
      getRandomUser,
      getUserData,
      getAverageStepGoal, 
    };
