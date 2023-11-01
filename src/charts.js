import Chart from 'chart.js/auto';

/// === CHARTS === ///
export const theWaterChart = (waterPerDayPerWeek) => {
  const data = waterPerDayPerWeek;
  new Chart(document.getElementById("waterChart"), {
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
        y: {
          title: {
            display: true,
            text: "in fluid Oz.",
          },
        },
      },
    },
  });
};

export const theStepChart = (activityData) => {
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

export const theActivityChart = (activityData) => {
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
    },
  });
};

export const theSleepingChart = (sleepInfo) => {
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
    },
  });
};
