// // export const urls = [
// //   "https://fitlit-api.herokuapp.com/api/v1/users",
// //   "https://fitlit-api.herokuapp.com/api/v1/sleep",
// //   "https://fitlit-api.herokuapp.com/api/v1/hydration",
// //   "https://fitlit-api.herokuapp.com/api/v1/activity",
// // ];
// // ^^^^This is the old data set from Part 1^^^^^

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
  .then (json => console.log(json, 'json'))
  .catch (error => console.log(error))
}

