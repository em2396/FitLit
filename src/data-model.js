import Chart from 'chart.js/auto'


/// === HELPER FUNCTIONS === ///
export const getRandomUser = userDataObj => {
  const currentUserIndex = Math.floor(Math.random() * userDataObj.length);
  return currentUserIndex;
};

export const getUserData = (userObj, indexPosition) => {
  if (indexPosition < 0 || indexPosition >= userObj.length) {
    return null;
  };
  const currentUser = userObj.find(user => {
    return user.id === indexPosition + 1;
  });
  const first = currentUser.name.split(" ");
  currentUser.firstName = first[0];
  return currentUser;
};

export const filterUserData = (data, currentUserObject) => {
  return data.filter((element) => {
    return element.userID === currentUserObject.id;
  });
};

/// === SLEEP === ///
//Return the user’s average number of hours slept per day
export const averageSleepDay = filterUser => {
  if (filterUser.length === 0) {
    return "0";
  };
  const total = filterUser.reduce((acc, user) => {
    return (acc += user.hoursSlept);
  }, 0);
  return (total / filterUser.length).toFixed(0);
};

//Return the user’s average sleep quality per day over all - Ben started
export const averageSleepQuality = filterUser => {
  const total = filterUser.reduce((acc, user) => {
    return (acc += user.sleepQuality);
  }, 0);
  return (total / filterUser.length).toFixed(0);
};

//Return how many hours a user slept for a specific day
export const specificSleepDay = (filterUser, dateOfSleep) => {
  const findDaySlept = filterUser.find(user => {
    return user.date === dateOfSleep;
  });
  const hoursOnDay = findDaySlept.hoursSlept;
  const string = `Slept for ${hoursOnDay} hours on ${dateOfSleep}`;
  return string;
};

// Return a user’s sleep quality for a specific day
export const getUserSleepQuality = (filterSleepData, dateOfSleep) => {
  const elementDate = filterSleepData.find(
    (element) => element.date === dateOfSleep
  );
  return elementDate.sleepQuality;
}

/// === ACTIVITY === ///
// Calculate the miles a user has walked based on their number of steps (use their strideLength to help calculate this), based on a specific day
export const getMilesPerDay = (userObj, activityData, date) => {
  const activityUserID = activityData.find(
    user => user.userID === userObj.id && user.date === date
  );
  const milesPerDay = ((userObj.strideLength * activityUserID.numSteps) / 5280).toFixed(0);
  return milesPerDay;
};

// Return how many minutes a user was active for a given day
export const getMinutesPerDay = (userObj, activityData, date) => {
  const activityUserID = activityData.find(user => user.userID === userObj.id && user.date === date);
  return activityUserID.minutesActive;
};

// Return if a user reached their step goal for a given day
export const getStepGoal = (userObj, activityData, date) => {
  const activityUserID = activityData.find(user => user.userID === userObj.id && user.date === date);
  if (activityUserID) {
    if (userObj.dailyStepGoal <= activityUserID.numSteps) {
      let goalVsTotal =  [userObj.dailyStepGoal, activityUserID.numSteps];
      return goalVsTotal;
    } else {
      const stepsLeft = userObj.dailyStepGoal - activityUserID.numSteps;
      return `User did not reach their goal of ${userObj.dailyStepGoal} steps. They reached only ${activityUserID.numSteps} with ${stepsLeft} left.`;
    }
  } else {
    return `No activity data found for the given date.`;
  };
};

export const getAverageStepGoal = userSample => {
  const total = userSample.reduce((accum, user) => {
    return accum += user.dailyStepGoal;
  }, 0)
  return (total / userSample.length).toFixed(0);
};

export const theWaterFunction = waterPerDayPerWeek => {
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
                      label: 'Recent Week of Water',
                      data: data.map(row => row.numOunces)
                  }
              ]
          },
          options: {
            responsive: true
          }
      }
      )
  };

export const stepChart = activityData => {
  const data = activityData;
  console.log(data)
    new Chart(
    document.getElementById('stepChart'),
    {
      type: 'doughnut',
      data: {
        labels: data.map(row => row.date),
        datasets: [
          {
            label: 'Num of Steps',
            data: data.map(row => row.numSteps)
          }
        ]
      },
      options: {
         responsive: true
      }
    }
  )
}

