const userName = document.querySelector('#username');
const userInfoButton = document.querySelector('.user-info');
const welcomeBack = document.querySelector('#welcomeBack');
const steps = document.querySelector('#totalSteps');
const usersAvgSteps = document.querySelector('#averageUsersSteps');
const waterConsumedToday = document.querySelector('#waterConsumedToday');
const averageSleepOverall = document.querySelector('#averageSleepOverall');
const sleepSpecificDay = document.querySelector('#sleepSpecificDay');
const stepsMadePerDay = document.querySelector('#stepsMadePerDay');
const minutesActivePerDay = document.querySelector('#minutesActivePerDay');
const milesWalkedPerDay = document.querySelector('#milesWalkedPerDay');
const waterChart = document.querySelector('#waterChart');
const stepChart = document.querySelector("#stepChart");
const sleepChart = document.querySelector('#sleepChart');
const activityChart = document.querySelector('#activityChart');
const stepComparison = document.querySelector('#stepComparison');
const currentDate = document.querySelector("#current-date");


//DOM UPDATE FUNCTIONS: 
//User Info:
export const displayUserInfo = (currentUser, activityToday) => {
  userName.innerText = currentUser.name;
  userInfoButton.innerText += `Address: ${currentUser.address} `;
  userInfoButton.innerText += `Email: ${currentUser.email} `;
  userInfoButton.innerText += `FitLit User ID: ${currentUser.id} `;
  userInfoButton.innerText += `Number of FitLit friends: ${currentUser.friends.length}`
  welcomeBack.innerText = `Welcome Back, ${currentUser.firstName}!`;
  currentDate.innerText = `Today is: ${activityToday.date}`;
};

// Water info:
export const displayWaterInfo = (todaysHydrationDate, waterChartToDom) => {
  waterConsumedToday.innerHTML = `<strong> Water Consumed Today:  </strong> ${todaysHydrationDate.numOunces} ounces`
  waterChart.innerHTML = waterChartToDom;
};
 
//Sleep info:
export const displaySleepInfo = (averageSleep, aveSleepQuality, sleepToday, sleepChartToDom) => {
  averageSleepOverall.innerHTML = `<strong> Average Overall Sleep: </strong> ${averageSleep} hours per day and Average<br> <strong> Sleep Quality: </strong> ${aveSleepQuality}`;
  sleepSpecificDay.innerHTML += `<p> Today, user slept for ${sleepToday.hoursSlept} hours with sleep quality of ${sleepToday.sleepQuality}`;
  sleepChart.innerHTML = sleepChartToDom;
};
  
//Activity info:
export const displayActivityInfo = (milesPerDay, minutesPerDay, activityToday, activityChartToDom) => {
    stepsMadePerDay.innerHTML = `<strong> Total user's steps today: </strong> ${activityToday.numSteps} steps.`;
    minutesActivePerDay.innerHTML = `<strong> Total active minutes today: </strong> ${minutesPerDay} minutes today.`;
    milesWalkedPerDay.innerHTML = `<strong> User has walked: </strong> ${milesPerDay} miles.`
    activityChart.innerHTML = activityChartToDom;
  };

//Step Info:
export const displayStepInfo = (currentUser, stepGoal, stepChartToDom, compareSteps, averageSteps) => {
  stepChart.innerHTML = stepChartToDom;
  steps.innerHTML = `<strong> Total Steps for Today: </strong> ${stepGoal.numSteps}<br>
  <strong> Step Goal:</strong> ${currentUser.dailyStepGoal} steps <br>
  <strong> Steps Left:</strong> ${stepGoal.stepsLeft} steps`;
  usersAvgSteps.innerHTML = `<strong>The average users step goal:</strong> ${averageSteps} steps.`;
  stepComparison.innerHTML = compareSteps;
};

