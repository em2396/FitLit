import { displayUserInfo } from './domUpdates.js';
import   sampleData   from './data/sampleData';
import './styles.css';

// Global Variables Here:
let userData = sampleData.sampleUsers;
let welcome;

//Event Listeners Here: 
window.addEventListener('load', function() {
  let randomIndex = getRandomUser(userData);
  let currentUser = getUserData(userData, randomIndex);
  const averageSteps = getAverageStepGoal(userData);
  displayUserInfo(currentUser, averageSteps); 
  displayUserInfo(currentUser, averageSteps);
  getAverageStepGoal(userData);
});

//Functions Here:
function getRandomUser(userData) {
  const currentUserIndex = Math.floor(Math.random() * userData.length);
    return currentUserIndex;
  };

function getUserData(userObj, indexPosition) {
   let currentUser = userObj.find((user) => {
        return user.id === (indexPosition + 1);
    });
    const first = currentUser.name.split(' ');
    currentUser.firstName = first[0];
    return currentUser;
  };

function getAverageStepGoal(userSample) {
    const total = userSample.reduce((acc,user) => {
        return acc += user.dailyStepGoal;
    }, 0)
    let average = (total / userSample.length).toFixed(0);
    console.log(average)
    return average; 
};

  module.exports = {
      getRandomUser,
      getUserData,
      getAverageStepGoal, 
      average
    };