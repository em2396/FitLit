export const urls = [
  "https://fitlit-api.herokuapp.com/api/v1/users",
  "https://fitlit-api.herokuapp.com/api/v1/sleep",
  "https://fitlit-api.herokuapp.com/api/v1/hydration",
  "https://fitlit-api.herokuapp.com/api/v1/activity",
];

export const fetchPromises = urls.map((url) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
);
