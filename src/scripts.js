import { displayUserInfo } from './domUpdates.js';
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