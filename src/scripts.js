import {displayUserInfo} from './domUpdates'
import   sampleData   from './data/sampleData';
import './styles.css';


const userName = document.querySelector('#username');
const location = document.querySelector('#location');
const hello = document.querySelector('#progressRightSide')



window.addEventListener('click', function(){
  console.log("hello hello helloooooooo")})
  
  let userData = sampleData.sampleUsers;
  

console.log(userData)




function getRandomUser(userData) {
  console.log(userData)
  const currentUserIndex = Math.floor(Math.random() * userData.length);
    return currentUserIndex;
  };




function getUserData(userObj, indexPosition) {
   const currentUser = userObj.find((user) => {
        return user.id === (indexPosition + 1)
    });
    return currentUser;

  };
console.log(getUserData(userData,1))



function getAverageStepGoal(userSample) {
    const total = userSample.reduce((accum,user) => {
        return accum += user.dailyStepGoal
    },0)
    return (total / userSample.length).toFixed(0)
}

console.log(getRandomUser(userData))

window.addEventListener('load', function() {
    let randomIndex = getRandomUser(userData);
  
    let currentUser = getUserData(userData, 0)
    console.log(randomIndex)
    console.log('page loaded')
    console.log(currentUser);
    console.log(getRandomUser(userData))
    console.log(displayUserInfo(currentUser));
    displayUserInfo(currentUser);
    //As a user, I should be able to view an info card with all of my info on the page
    //As a user, I should be able to see my first name somewhere prominently on the page to welcome me
    //As a user, I should be able to see how my step goal compares to the average step goal amongst all users (this display should not be hard-coded)
  });
// console.log(getAverageStepGoal(userSample))






  console.log(getRandomUser(userData));
  //returns one object from sample data

  module.exports = {
      getRandomUser,
      getUserData

    }