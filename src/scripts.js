// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
// const styles = require('./css/styles.css')
// import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
// import userData from './data/users';
const { userSample } = require('./data/sampleData')

// import sampleData from './data/sampleData';
// console.log("User Data:", userData);

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
// import { exampleFunction1, exampleFunction2 } from './domUpdates';

// exampleFunction1('Travis');
// exampleFunction2('Travis')

function getUserData(userSample, userID) {
    return userSample.find((user) => { 
        return user.id === userID
    })
}

// console.log(getUserData(userSample,1))

function getAverageStepGoal(userSample) {
    const total = userSample.reduce((accum,user) => {
        return accum += user.dailyStepGoal
    },0)
    return (total / userSample.length).toFixed(0)
}

// console.log(getAverageStepGoal(userSample))

function getRandomUser(userSample) {
    const currentUserIndex = Math.floor(Math.random() * userSample.length)
    const currentUser = userSample[currentUserIndex]
    return currentUser
  };