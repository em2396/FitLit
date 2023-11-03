import Chart from 'chart.js/auto';

/// === CHARTS === ///
export const waterChart = (waterPerDayPerWeek) => {
  const data = waterPerDayPerWeek;
  var waterC = new Chart(document.getElementById("waterChart"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: "Recent Week of Water",
          data: data.map((row) => row.numOunces),
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { // Use 'x' instead of 'y' to configure the x-axis
          title: {
            display: true,
            text: "Date", // Your x-axis label
          },
        },
        y: {
          title: {
            display: true,
            text: "Water Amount (in fluid Oz)",
          },
        },
      },
    },
  });
  return waterC;
};

export const stepChart = (activityData) => {
  const data = activityData;
  new Chart(document.getElementById("stepChart"), {
    type: "doughnut",
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: "Num of Steps",
          data: data.map((row) => row.numSteps),
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
};

export const activityChart = (activityData) => {
  const data = activityData;
  new Chart(document.getElementById("activityChart"), {
    type: "line",
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: "Minutes Active",
          data: data.map((row) => row.minutesActive),
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { // Use 'x' instead of 'y' to configure the x-axis
          title: {
            display: true,
            text: "Date", 
          },
        },
        y: {
          title: {
            display: true,
            text: "Minutes Active",
          },
        },
      },
    },
  });
};

export const sleepingChart = (sleepInfo) => {
  const data = sleepInfo;
  new Chart(document.getElementById("sleepChart"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: "Hours Slept",
          data: data.map((row) => row.hoursSlept),
          backgroundColor: "#0461cf",
        },
        {
          label: "Sleep Quality",
          data: data.map((row) => row.sleepQuality),
          backgroundColor: "#404348",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { // Use 'x' instead of 'y' to configure the x-axis
          title: {
            display: true,
            text: "Date", 
          },
        },
        y: {
          title: {
            display: true,
            text: "Hours slept and Sleep Quality",
          },
        },
      },
    },
  });
};
//