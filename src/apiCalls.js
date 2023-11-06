import { hydrationDataAll, currentUser, waterChartToDom } from './scripts.js'
import { waterChart } from './charts.js'
import { displayWaterInfo } from './domUpdates.js'
import { filterUserData, getLatestData } from './data-model.js';

const errorEl = document.querySelector(".error");
const asideOne = document.querySelector('.asideOne');
const asideTwo = document.querySelector('.asideTwo');
const errorMessage = document.querySelector('.error-message');

export const urls = [
  "http://localhost:3001/api/v1/users",
  "http://localhost:3001/api/v1/sleep",
  "http://localhost:3001/api/v1/activity",
  "http://localhost:3001/api/v1/hydration"
];

export const fetchPromises = urls.map(url =>
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error (`${response.status}: Failed to fetch data`)
      }
    return response.json()
    })
    .then((data) => {
      return data;
    }).catch(error => {
      if (error instanceof TypeError) {
        asideOne.classList.add('hidden');
        asideTwo.classList.add('hidden');
        errorMessage.innerText = "‼️ Unable to connect to the server.    Please try again later. "
        errorMessage.classList.remove('hidden')
      } else {
        alert(error.message)
      }
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
  .then((response) => {
    if (!response.ok) {
      throw new Error (`${response.status}: Failed to fetch data`)
    }
  return response.json()
  })
  .then (json => {
    hydrationDataAll.push(json);
    console.log(hydrationDataAll, 'inside POST func')
    let newHydrationData = filterUserData(hydrationDataAll, currentUser); 
    let todaysHydrationDate = getLatestData(newHydrationData);
    console.log(todaysHydrationDate, 'should be newly added')
    let waterPerDayPerWeek = getLatestData(newHydrationData, 'week');
    console.log(waterPerDayPerWeek, 'should included 7 days');
    waterChartToDom.destroy(); //bc we imported from another file, we can't set that...
    let newWaterChartToDom = waterChart(waterPerDayPerWeek);
    displayWaterInfo(todaysHydrationDate, newWaterChartToDom);
  })
  .catch (error => {
    alert(error.message)
  })
}

//need to add another if statement for if the date after 07 01 has already been inputted...
export const sendDataToAPI = current => {
  let ounces = parseInt(ouncesInput.value);
  if (!isNaN(new Date(dateInput.value)) && typeof ounces === 'number' && ounces <= 675 && ouncesInput.value) {
    const api = {
      userID: current.id,
      date: dateInput.value,
      numOunces: ounces
    }
    fetchPosts(api);
    return api;
  } else {
    errorEl.classList.toggle("hidden");
    errorEl.innerText = 'One or more was inputted incorrectly: Incorrect date and/or unreasonable number';
  }
}

