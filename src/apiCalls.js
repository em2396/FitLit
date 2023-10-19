
// Your fetch requests will live here!
console.log('I will be a fetch request!')

const urls = ['https://fitlit-api.herokuapp.com/api/v1/users', 'https://fitlit-api.herokuapp.com/api/v1/sleep', 'https://fitlit-api.herokuapp.com/api/v1/hydration', 'https://fitlit-api.herokuapp.com/api/v1/activity'
];


export const fetchPromises = urls.map(url => fetch(url).then(response => response.json()).then(data => { return data}));



