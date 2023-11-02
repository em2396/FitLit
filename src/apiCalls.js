import { hydrationDataAll, currentUser, waterChartToDom } from './scripts.js'
import { theWaterChart } from './charts.js'
import { displayWaterInfo } from './domUpdates.js'
import { filterUserData, getLatestData} from './data-model.js';


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