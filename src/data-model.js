import Chart from 'chart.js/auto'
import { fetchPosts } from './apiCalls';

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


//Filter all the user data to all the data of the current user
export const filterUserData = (data, currentUserObject) => {
  // console.log(data, 'data in filterUser')
  const filteredElement = data.filter((element) => {
    return element.userID === currentUserObject.id;
  });
  return filteredElement;
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

//Replace getMilesPerDay, getUserSleepQuality (not being used in the DOM), getMinutesPerDay
export const getInfoPerDay = (currentUser, currentData, today, specific) => {
  const elementData = currentData.find(user => user.date === today.date);
  if (!elementData) {
    return '0';
  } else if (specific === 'numSteps') {
    const milesPerDay = ((currentUser.strideLength * elementData.numSteps) / 5280).toFixed(0);
    return milesPerDay;
  } else {
    return elementData[specific];
  }
}

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

export const sendDataToAPI = current => {
  if (!isNaN(new Date(dateInput.value)) && typeof ouncesInput.value === 'number' && ouncesInput.value <= 675) {
    const api = {
      userID: current.id,
      date: dateInput.value,
      numOunces: ouncesInput.value
    }
    fetchPosts(api);
    return api;
  } else {
    alert('One or more was inputted correctly: Incorrect date and/or unreasonable number');
  }
}
