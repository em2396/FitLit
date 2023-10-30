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

//Universal average function
//replace getAverageStepGoal, averageSleepQuality, averageSleepDay, getAvgDailyOunces (in hydrationFunctions.js)
export const universalAverage = (obj, accessKey) => {
  const total = obj.reduce((acc, current) => {
    return acc += current[accessKey];
  }, 0);
  return (total / obj.length).toFixed(0);
};

//RETRUN THE MOST RECENT WEEK OF DATA OR THE MOST RECENT DAY DEPEDING ON INPUT ARGUMENTS.
export const getLatestData = (filteredData, wholeWeek) => {
  let total;
  if (wholeWeek === 'week') {
    total = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return total.slice(0, 7);
  } else {
  total = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  return total[0];
  }
};

export const filterUserData = (data, currentUserObject) => {
  return data.filter((element) => {
    return element.userID === currentUserObject.id;
  });
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
  };
  
  /// === ACTIVITY === ///
  export const getMilesPerDay = (currentUser, currentActivityData, today) => {
    const activityData = currentActivityData.find(user => user.date === today.date);
    if (!activityData) {
      return "0";
    }
    const milesPerDay = ((currentUser.strideLength * activityData.numSteps) / 5280).toFixed(0);
    return milesPerDay;
  };
  
  // Return how many minutes a user was active for a given day
  export const getMinutesPerDay = (currentActivityData, today) => {
    const activityUserID = currentActivityData.find(user => user.date === today.date);
    if (activityUserID) {
      return activityUserID.minutesActive;
    } else {
      return 0;
    }
  };
  
  // Return if a user reached their step goal for a given day
  export const getStepGoal = (currentUser, currentActivityData, today) => {
    const activityUserID = currentActivityData.find(user => user.date === today.date);
    if (currentUser.dailyStepGoal >= activityUserID.numSteps) {
      const stepsLeft = currentUser.dailyStepGoal - activityUserID.numSteps;
      activityUserID.stepsLeft = stepsLeft;
      return activityUserID;
    } else {
      const stepsLeft = 0;
      activityUserID.stepsLeft = stepsLeft;
      return activityUserID
    }
  };
  
  
  //compare averageStep goal:
  //   As a user, I should be able to see how my step goal compares to the average step goal amongst all users (this display should not be hard-coded) 
  export const compareStepGoal = (currentUser, allUsers) => {
    const averageStepGoal = universalAverage(allUsers, 'dailyStepGoal'); 
    const userStepGoal = currentUser.dailyStepGoal;
    
    if (userStepGoal > averageStepGoal) {
      return `Your step goal, ${userStepGoal} steps, is higher than the average step goal ${averageStepGoal} steps among all users.`;
    } else if (userStepGoal < averageStepGoal) {
      return `Your step goal, ${userStepGoal} steps, is lower than the average step goal ${averageStepGoal} steps among all users.`;
    } else {
      return `Your step goal, ${userStepGoal} steps, is equal to the average step goal among all users.`;
    }
  };
  
  
  
  /// === SLEEP === ///
  //Return the user’s average number of hours slept per day
  // export const averageSleepDay = filterUser => {
  //   if (filterUser.length === 0) {
  //     return "0";
  //   };
  //   const total = filterUser.reduce((acc, user) => {
  //     return (acc += user.hoursSlept);
  //   }, 0);
  //   return (total / filterUser.length).toFixed(0);
  // };

  //Return the user’s average sleep quality per day over all - Ben started
  // export const averageSleepQuality = filterUser => {
  //   const total = filterUser.reduce((acc, user) => {
  //     return (acc += user.sleepQuality);
  //   }, 0);
  //   return (total / filterUser.length).toFixed(0);
  // };
  
  //average stepGoal
  // export const getAverageStepGoal = userSample => {
  //   const total = userSample.reduce((accum, user) => {
  //     return accum += user.dailyStepGoal;
  //   }, 0)
  //   return (total / userSample.length).toFixed(0);
  // };

/// === CHARTS === ///
export const theWaterChart = waterPerDayPerWeek => {
  const data = waterPerDayPerWeek;
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
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'in fluid Oz.'
            }
          }
        }
      }
    })
};

export const theStepChart = activityData => {
  const data = activityData;
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
};

export const theActivityChart = activityData => {
  const data = activityData;
  new Chart(
    document.getElementById('activityChart'),
    {
      type: 'line',
      data: {
        labels: data.map(row => row.date),
        datasets: [
          {
            label: 'Minutes Active',
            data: data.map(row => row.minutesActive)
          }
        ]
      },
      options: {
        responsive: true
      }
    })
};

export const theSleepingChart = sleepInfo => {
  const data = sleepInfo;
  new Chart(
    document.getElementById('sleepChart'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.date),
        datasets: [
          {
            label: 'Hours Slept',
            data: data.map(row => row.hoursSlept),
            backgroundColor: '#0461cf'
          },
          {
            label: 'Sleep Quality',
            data: data.map(row => row.sleepQuality),
            backgroundColor: '#404348'
          }
        ]
      },
      options: {
        responsive: true
      }
    })
}

