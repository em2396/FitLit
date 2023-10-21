const userName = document.querySelector('#username');
const location = document.querySelector('.location');
const welcomeBack = document.querySelector('#welcomeBack');
const steps = document.querySelector('#totalSteps');
const usersAvgSteps = document.querySelector('#averageUsersSteps');
const waterConsumedToday = document.querySelector('#waterConsumedToday');
const waterConsumedPerWeek = document.querySelector('#waterEachDayOfWeek');
const averageSleepOverall = document.querySelector('#averageSleepOverall');
const sleepSpecificDay = document.querySelector('#sleepSpecificDay');
const sleepPerWeek = document.querySelector('#sleepPerDayPerWeek');
const stepsMadePerDay = document.querySelector('#stepsMadePerDay');
const minutesActivePerDay = document.querySelector('#minutesActivePerDay');
const milesWalkedPerDay = document.querySelector('#milesWalkedPerDay');
const weekStepCount = document.querySelector('#weekStepCount');
const waterChart = document.querySelector('#waterChart');
const stepChart = document.querySelector("#stepChart");
const sleepChart = document.querySelector('#sleepChart');

export function displayUserInfo(currentUser, averageSteps, averageSleep, aveSleepQuality, todaysHydrationDate, sleepToday, milesPerDay, minutesPerDay, stepGoal, activityPerDayPerWeek, activityToday, waterChartToDom, stepChartToDom, sleepChartToDom) {
  //random current User info:
  userName.innerText = currentUser.name;
  location.innerText += `${currentUser.address} `;
  location.innerText += `email: ${currentUser.email} `;
  location.innerText += `FitLit User ID: ${currentUser.id} `;
  location.innerText += `Number of FitLit friends: ${currentUser.friends.length}`
  welcomeBack.innerText = `Welcome Back, ${currentUser.firstName}!`;
  
  //steps info:
  steps.innerText = `Total Steps for Today: ${stepGoal[1]}, Step Goal: ${stepGoal[0]} steps`;
  usersAvgSteps.innerText = `The average users step goal is ${averageSteps} steps.`;
  
  //water info:
  waterConsumedToday.innerText = `Water Consumed Today (${todaysHydrationDate.date}): ${todaysHydrationDate.numOunces}oz`
  waterChart.innerHTML = waterChartToDom;
  
  //sleep info:
  //should be able to see my all-time average sleep quality and all-time average number of hours slept:
  averageSleepOverall.innerText = `Average Overall Sleep: ${averageSleep} hours per day and Average Sleep Quality: ${aveSleepQuality}`;

  // As a user, I should be able to see my sleep data over the course of the latest week (hours slept and quality of sleep)
  // sleepPerDayPerWeek.forEach((data) => {
  //   console.log("Data", data)
  //   sleepPerWeek.innerHTML += `<p> On ${data.date}, user slept for ${data.hoursSlept} hours with sleep quality of ${data.sleepQuality}`;
  // });
  sleepSpecificDay.innerHTML += `<p> Today, ${sleepToday.date}, user slept for ${sleepToday.hoursSlept} hours with sleep quality of ${sleepToday.sleepQuality}`;
  sleepChart.innerHTML = sleepChartToDom;

  //activity info:
  //As a user, I should be able to see my number of steps I’ve made for the latest day:
  stepsMadePerDay.innerText = `On ${activityToday.date}, total user's steps is ${activityToday.numSteps} steps.`;
  stepChart.innerHTML = stepChartToDom;

  //As a user, I should be able to view the number minutes I’ve been active for the latest day
  minutesActivePerDay.innerText = `On ${activityToday.date}, total active minutes is ${minutesPerDay} minutes.`;

  // As a user, I should also see the distance I have walked (in miles) for the latest day based on my step count
  milesWalkedPerDay.innerText = `On ${activityToday.date}, user has walked ${milesPerDay} miles.`


  // As a user, I should be able to view a weekly view of my step count and if I have reached my step count goal for each day
  activityPerDayPerWeek.forEach((data) => {
    weekStepCount.innerHTML += `<p> On ${data.date}, user's step count is ${data.numSteps} steps.`;
});
};

