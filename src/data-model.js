
/// === HELPER FUNCTIONS === ///
export function getRandomUser(userDataObj) {
  const currentUserIndex = Math.floor(Math.random() * userDataObj.length);
  return currentUserIndex;
}

export function getUserData(userObj, indexPosition) {
  if (indexPosition < 0 || indexPosition >= userObj.length) {
    return null;
  }

  let currentUser = userObj.find((user) => {
    return user.id === indexPosition + 1;
  });

  const first = currentUser.name.split(" ");
  currentUser.firstName = first[0];
  return currentUser;
}

export function filterUserData(data, currentUserObject) {
  let filterUser = data.filter((element) => {
    return element.userID === currentUserObject.id;
  });
  return filterUser;
}


/// === SLEEP === ///
//Return the user’s average number of hours slept per day
export function averageSleepDay(filterUser) {
  if (filterUser.length === 0) {
    return "0";
  }
  const total = filterUser.reduce((acc, user) => {
    return (acc += user.hoursSlept);
  }, 0);
  const averageSleep = (total / filterUser.length).toFixed(0);
  return averageSleep;
}

//Return the user’s average sleep quality per day over all - Ben started
export function averageSleepQuality(filterUser) {
  const total = filterUser.reduce((acc, user) => {
    return (acc += user.sleepQuality);
  }, 0);
  const averageSleepQuality = (total / filterUser.length).toFixed(0);
  return averageSleepQuality;
}

//Return how many hours a user slept for a specific day
export function specificSleepDay(filterUser, dateOfSleep) {
  const findDaySlept = filterUser.find((user) => {
    return user.date === dateOfSleep;
  });
  console.log(findDaySlept, "find days slept");
  const hoursOnDay = findDaySlept.hoursSlept;
  const string = `Slept for ${hoursOnDay} hours on ${dateOfSleep}`;
  return string;
}

// Return a user’s sleep quality for a specific day
export function getUserSleepQuality(filterSleepData, dateOfSleep) {
  const elementDate = filterSleepData.find(
    (element) => element.date === dateOfSleep
  );
  return elementDate.sleepQuality;
}

/// === ACTIVITY === ///
// Calculate the miles a user has walked based on their number of steps (use their strideLength to help calculate this), based on a specific day
export function getMilesPerDay(userObj, activityData, date) {
  const activityUserID = activityData.find(
    (user) => user.userID === userObj.id && user.date === date
  );
  const milesPerDay = (
    (userObj.strideLength * activityUserID.numSteps) / 5280).toFixed(0);
  return milesPerDay;
}

// Return how many minutes a user was active for a given day
export function getMinutesPerDay(userObj, activityData, date) {
  const activityUserID = activityData.find(
    (user) => user.userID === userObj.id && user.date === date
  );
  const minutesPerDay = activityUserID.minutesActive;
  return minutesPerDay;
}

// Return if a user reached their step goal for a given day
export function getStepGoal(userObj, activityData, date) {
  const activityUserID = activityData.find(
    (user) => user.userID === userObj.id && user.date === date
  );
  if (activityUserID) {
    if (userObj.dailyStepGoal <= activityUserID.numSteps) {
      return `User has reached or surpassed their step goal of ${userObj.dailyStepGoal} steps, reaching ${activityUserID.numSteps}`;
    } else {
      const stepsLeft = userObj.dailyStepGoal - activityUserID.numSteps;
      return `User did not reach their goal of ${userObj.dailyStepGoal} steps. They reached only ${activityUserID.numSteps} with ${stepsLeft} left.`;
    }
  } else {
    return `No activity data found for the given date.`;
  }
}

export function getAverageStepGoal(userSample) {
  const total = userSample.reduce((accum, user) => {
    return accum += user.dailyStepGoal;
  }, 0)
  let average = (total / userSample.length).toFixed(0);
  return average;
};

import Chart from 'chart.js/auto'
// import {waterPerDayPerWeek} from './scripts.js'

export function theWaterFunction(waterPerDayPerWeek) {
  const data = waterPerDayPerWeek;
  console.log(waterPerDayPerWeek, 'this is in water fun')
  new Chart(
      document.getElementById('waterChart'),
      {
          type: 'bar',
          data: {
              labels: data.map(row => row.date),
              datasets: [
                  {
                      label: 'Num Of Ounces',
                      data: data.map(row => row.numOunces)
                  }
              ]
          }
      }
      )
  };