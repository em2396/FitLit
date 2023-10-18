//Functions Here:
export function getRandomUser(userData) {
  const currentUserIndex = Math.floor(Math.random() * userData.length);
  return currentUserIndex;
};

//❗👇 changed this function so when testing if the indexPosition is out of range it will return null 
//-> preventing errors caused by trying to access undefined with the current user ❗👇
// export function getUserData(userObj, indexPosition) {
//   let currentUser = userObj.find((user) => {
//     return user.id === (indexPosition + 1);
//   });
//   const first = currentUser.name.split(' ');
//   currentUser.firstName = first[0];
//   return currentUser;
// };

// NEW FUNCTION to handle sad paths ❗👇
export function getUserData(userObj, indexPosition) {
  if (indexPosition < 0 || indexPosition >= userObj.length) {
    return null; 
  }

  let currentUser = userObj.find((user) => {
    return user.id === (indexPosition + 1);
  });

  const first = currentUser.name.split(' ');
  currentUser.firstName = first[0];
  return currentUser;
}


export function filterUserData(data, currentUserObject) {
  let filterUser = data.filter((element => {
    return (element.userID === currentUserObject.id)
  }))
  return filterUser
};

//Return the user’s average number of hours slept per day
export function averageSleepDay(filterUser) {
  const total = filterUser.reduce((acc, user) => {
    return acc += user.hoursSlept;
  }, 0)
  const averageSleep = (total / filterUser.length).toFixed(0);
  return averageSleep;
};

//Return the user’s average sleep quality per day over all - Ben started
export function averageSleepQuality(filterUser) {
  const total = filterUser.reduce((acc, user) => {
    return acc += user.sleepQuality;
  }, 0)
  const averageSleepQuality = (total / filterUser.length).toFixed(0);
  return averageSleepQuality;
};

//Return how many hours a user slept for a specific day
export function specificSleepDay(filterUser, dateOfSleep) {
  const findDaySlept = filterUser.find(user => {
    return user.date === dateOfSleep
  });
  console.log(findDaySlept, 'find days slept')
  const hoursOnDay = findDaySlept.hoursSlept;
  const string = `Slept for ${hoursOnDay} hours on ${dateOfSleep}`;
  return string;
}

//Return a user’s sleep quality for a specific day
export function getUserSleepQuality(filterSleepData, dateOfSleep) {
  const elementDate = filterSleepData.find((element) => element.date === dateOfSleep)
  return elementDate.sleepQuality
}

// Return a user’s sleep quality for each day over the course of a given week (7 days) 
//Return how many hours a user slept each day over the course of a given week (7 days) - getDataPerWeek(filteredData, startDate) 
// FOR THESE WE USED fuction getDataPerWeek(filteredData, startDate) in hydrationFunction.js. Works, gets object of 7 days.. may need to use to manipulate object to display on dom. Access sleepQuality and hoursSlept of that startDate & 7 days