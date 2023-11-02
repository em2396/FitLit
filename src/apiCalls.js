import { hydrationDataAll, currentUser, waterChartToDom } from './scripts.js'
import { theWaterChart } from './charts.js'
import { displayWaterInfo } from './domUpdates.js'
import { filterUserData, getLatestData, getOuncesPerDay, universalAverage} from './data-model.js';


export const urls = [
  "http://localhost:3001/api/v1/users",
  "http://localhost:3001/api/v1/sleep",
  "http://localhost:3001/api/v1/activity",
  "http://localhost:3001/api/v1/hydration"
];

export const fetchPromises = urls.map(url =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    }).catch(error => {
      console.log(error)
    }).catch(error => {
      console.log(error)
    })
);


//if input boxes are both filled, then invoke fetch 
export const fetchPosts = (data) => {
  fetch ('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then (response => response.json())
  .then (json => {
    hydrationDataAll.push(json);
    console.log(hydrationDataAll, 'inside POST func')
    let newHydrationData = filterUserData(hydrationDataAll, currentUser); 
    let todaysHydrationDate = getLatestData(newHydrationData);
    console.log(todaysHydrationDate, 'should be newly added')
    let waterPerDayPerWeek = getLatestData(newHydrationData, 'week');
    console.log(waterPerDayPerWeek, 'should included 7 days');
    waterChartToDom.destroy();
    waterChartToDom = theWaterChart(waterPerDayPerWeek);
    displayWaterInfo(todaysHydrationDate, waterChartToDom);
  })
  .catch (error => console.log(error))
}

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

