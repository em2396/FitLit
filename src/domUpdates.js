const userName = document.querySelector('#username');
const location = document.querySelector('#location');
const welcomeBack = document.querySelector('#welcomeBack');
const steps = document.querySelector('#totalSteps');
let usersAvgSteps = document.querySelector('#averageUsersSteps');
let waterConsumedToday = document.querySelector('#waterConsumedToday');
let waterConsumedPerWeek = document.querySelector('#waterEachDayOfWeek');
const averageSleepOverall = document.querySelector('#averageSleepOverall');
const sleepSpecificDay = document.querySelector('#sleepSpecificDay');
const sleepPerWeek = document.querySelector('#sleepPerDayPerWeek')

export function displayUserInfo(currentUser, averageSteps, waterPerSpecificDay, waterPerDayPerWeek, averageSleep, aveSleepQuality, sleepPerDayPerWeek, todaysHydrationDate, sleepToday) {
  userName.innerText = `${currentUser.name}`;
  location.innerText = `${currentUser.address}`;
  welcomeBack.innerText = `Welcome Back, ${currentUser.firstName}!`;
  steps.innerText = `Step Goal: ${currentUser.dailyStepGoal}`;
  usersAvgSteps.innerText = `The average users step goal: ${averageSteps}`;
  waterConsumedToday.innerText = `Water Consumed Today (${todaysHydrationDate.date}): ${todaysHydrationDate.numOunces}oz`
  waterPerDayPerWeek.forEach((data) => {
    waterConsumedPerWeek.innerHTML += `<p> Water Consumed on ${data.date} : ${data.numOunces}oz`
  });
  //should be able to see my all-time average sleep quality and all-time average number of hours slept:
  averageSleepOverall.innerText = `Average Overall Sleep: ${averageSleep} and Average Sleep Quality: ${aveSleepQuality}`;

  // As a user, I should be able to see my sleep data over the course of the latest week (hours slept and quality of sleep)
  sleepPerDayPerWeek.forEach((data) => {
    console.log("Data", data)
    sleepPerWeek.innerHTML += `<p> On ${data.date}, user slept for ${data.hoursSlept} hours with sleep quality of ${data.sleepQuality}`;
  });
  sleepSpecificDay.innerHTML += `<p> Today (${sleepToday.date}), user slept for ${sleepToday.hoursSlept} hours with sleep quality of ${sleepToday.sleepQuality}`;

  //  should be able to see my sleep data for the latest day (hours slept and quality of sleep)
  //NEXT STEP: have to create a function to find the sleep data for latest day!
};
