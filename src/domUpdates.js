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
const activityChart = document.querySelector('#activityChart')
const stepComparison = document.querySelector('#stepComparison')


//DOM UPDATE FUNCTIONS: 
//User Info:
export const displayUserInfo = currentUser => {
  userName.innerText = currentUser.name;
  userInfoButton.innerText += `Address: ${currentUser.address} `;
  userInfoButton.innerText += `Email: ${currentUser.email} `;
  userInfoButton.innerText += `FitLit User ID: ${currentUser.id} `;
  userInfoButton.innerText += `Number of FitLit friends: ${currentUser.friends.length}`
  welcomeBack.innerText = `Welcome Back, ${currentUser.firstName}!`;
};

// Water info:
export const displayWaterInfo = (todaysHydrationDate, waterChartToDom) => {
  waterConsumedToday.innerText = `Water Consumed Today (${todaysHydrationDate.date}): ${todaysHydrationDate.numOunces}oz`
  waterChart.innerHTML = waterChartToDom;
};
 
//Sleep info:
export const displaySleepInfo = (averageSleep, aveSleepQuality, sleepToday, sleepChartToDom) => {
  averageSleepOverall.innerText = `Average Overall Sleep: ${averageSleep} hours per day and Average Sleep Quality: ${aveSleepQuality}`;
  sleepSpecificDay.innerHTML += `<p> Today, ${sleepToday.date}, user slept for ${sleepToday.hoursSlept} hours with sleep quality of ${sleepToday.sleepQuality}`;
  sleepChart.innerHTML = sleepChartToDom;
};
  
//Activity info:
export const displayActivityInfo = (milesPerDay, minutesPerDay, activityToday, activityChartToDom) => {
    stepsMadePerDay.innerText = `On ${activityToday.date}, total user's steps is ${activityToday.numSteps} steps.`;
    minutesActivePerDay.innerText = `On ${activityToday.date}, total active minutes is ${minutesPerDay} minutes.`;
    milesWalkedPerDay.innerText = `On ${activityToday.date}, user has walked ${milesPerDay} miles.`
    activityChart.innerHTML = activityChartToDom;
  };

//Step Info:
export const displayStepInfo = (currentUser, stepGoal, stepChartToDom, compareSteps, averageSteps) => {
  stepChart.innerHTML = stepChartToDom;
  steps.innerText = `Total Steps for Today: ${stepGoal.numSteps}, Step Goal: ${currentUser.dailyStepGoal} steps, Steps Left: ${stepGoal.stepsLeft}`;
  usersAvgSteps.innerText = `The average users step goal is ${averageSteps} steps.`;
  stepComparison.innerHTML = compareSteps;
};

