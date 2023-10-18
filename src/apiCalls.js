
// Your fetch requests will live here!
console.log('I will be a fetch request!')

export function getData(endpoint){
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${endpoint}`)
  .then(response => response.json()).then(data => {return data});
}


