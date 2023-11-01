// import Chart from 'chart.js/auto'
// import { theWaterChart, theStepChart, theActivityChart, theSleepingChart } from './charts.js'
import { fetchPosts } from "./apiCalls.js";


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
  if (obj.length === 0) {
    return 0; 
  }
  const total = obj.reduce((acc, current) => {
    return acc + current[accessKey];
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

export const getOuncesPerDay = (userObj, dataList, date) => {
  const hydrationUserId = dataList.find(dataObj => dataObj.userID === userObj.id && dataObj.date === date);
  if (hydrationUserId) {
    return hydrationUserId.numOunces;
  } else {
    return 0;
  };
};


//need to add another if statement for if the date after 07 01 has already been inputted...
export const sendDataToAPI = current => {
  let ouncesStr = ouncesInput.value;
  let num = parseInt(ouncesStr);
  if (!isNaN(new Date(dateInput.value)) && typeof num === 'number' && ouncesInput.value <= 675 && ouncesInput.value) {
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




