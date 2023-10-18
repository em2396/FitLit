
//Functions Here:

export function getRandomUser(userData) {
    const currentUserIndex = Math.floor(Math.random() * userData.length);
      return currentUserIndex;
    };
  
  export function getUserData(userObj, indexPosition) {
      let currentUser = userObj.find((user) => {
          return user.id === (indexPosition + 1);
      });
      const first = currentUser.name.split(' ');
      currentUser.firstName = first[0];
      return currentUser;
    };
  
  export function getAverageStepGoal(userSample) {
      const total = userSample.reduce((acc,user) => {
          return acc += user.dailyStepGoal;
      }, 0)
      let average = (total / userSample.length).toFixed(0);
      console.log(average)
      return average; 
  };

  export function filterUserData(data, currentUserObject) {
    let filterUser = data.filter((element => {
     return (element.userID === currentUserObject.id)
    }))
    return filterUser
};

  export function averageSleepDay(filterUser) {
    const total = filterUser.reduce((acc, user) => {
      return acc += user.hoursSlept;
    }, 0)
    const averageSleep = (total / filterUser.length).toFixed(0);
    return averageSleep;
  };

  /*[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "hoursSlept": [number - hours],
    "sleepQuality": [number - unitless]
  },

  ...more sleep data
] */
