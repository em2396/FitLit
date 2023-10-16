import { displayUserInfo } from "./domUpdates.js";
import sampleData from "./data/sampleData";
import {
  getRandomUser,
  getUserData,
  getAverageStepGoal,
} from "./data-model.js";
import "./styles.css";

// Global Variables Here:
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


