
//Functions Here:

export function getRandomUser(userData) {
    const currentUserIndex = Math.floor(Math.random() * userData.length);
    console.log("currentUserIndex:", currentUserIndex)
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
}




  export function getOuncesPerWeek(filteredData) {
    const total = filteredData.reduce((acc, user) => {
      return acc += user.numOunces
    }, 0)
    return total;
  }

  export function averageSleepDay(filterUser) {
    const total = filterUser.reduce((acc, user) => {
      return acc += user.hoursSlept;
    }, 0)
    return total;
  }

  /*[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "hoursSlept": [number - hours],
    "sleepQuality": [number - unitless]
  },

  ...more sleep data
] */

const sampleSleep = [
{
  userID: 1,
  date: "2023/01/12",
  hoursSlept: 10,
  sleepQuality: 2
}, 
{
  userID: 2,
  date: "2023/01/13",
  hoursSlept: 8,
  sleepQuality: 3
},
{
  userID: 1,
  date: "2023/01/14",
  hoursSlept: 10,
  sleepQuality: 2
}
]