import { displayUserInfo } from './domUpdates.js';
import   sampleData   from './data/sampleData';
import './styles.css';

//QuerySelectors Here:
const userName = document.querySelector('#username');
const location = document.querySelector('#location');
const hello = document.querySelector('#progressRightSide');

//Variables Here:
let userData = sampleData.sampleUsers;
let welcome;

//Event Listeners Here: 
window.addEventListener('load', function() {
  let randomIndex = getRandomUser(userData);
  let currentUser = getUserData(userData, randomIndex);
  getAverageStepGoal(userData);
  displayUserInfo(currentUser);
  //As a user, I should be able to view an info card with all of my info on the page 
  //As a user, I should be able to see my first name somewhere prominently on the page to welcome me X
  //As a user, I should be able to see how my step goal compares to the average step goal amongst all users (this display should not be hard-coded)
});
// console.log(getAverageStepGoal(userSample))
// window.addEventListener('click', function(){
//   console.log("hello hello helloooooooo")})
  
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