// //NOTE: Your DOM manipulation will occur in this file
const { userSample } = require('./data/sampleData');
const { getRandomUser } = require('./scripts');


const userName = document.querySelector('#username');
const location = document.querySelector('#location');
const hello = document.querySelector('#progressRightSide')



export function displayUserInfo(currentUser) {
  userName.innerText = `${currentUser.name}`
  location.innerText = `${currentUser.address}`
}


