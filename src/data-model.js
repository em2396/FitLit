import interact from 'interactjs'

/// === HELPER FUNCTIONS === ///
export const getRandomUser = userDataObj => {
  const currentUserIndex = Math.floor(Math.random() * userDataObj.length);
  return currentUserIndex;
};

export const getUserData = (userObj, indexPosition) => {
  if (indexPosition < 0 || indexPosition >= userObj.length) {
    return null;
  };
  const currentUser = userObj.find(user => {
    return user.id === indexPosition + 1;
  });
  const first = currentUser.name.split(" ");
  currentUser.firstName = first[0];
  return currentUser;
};

//Universal average function
//replace getAverageStepGoal, averageSleepQuality, averageSleepDay, getAvgDailyOunces (in hydrationFunctions.js)
export const universalAverage = (obj, accessKey) => {
  if (obj.length === 0) {
    return 0; 
  }
  const total = obj.reduce((acc, current) => {
    return acc + current[accessKey];
  }, 0);
  return (total / obj.length).toFixed(0);
};

//RETRUN THE MOST RECENT WEEK OF DATA OR THE MOST RECENT DAY DEPEDING ON INPUT ARGUMENTS.
export const getLatestData = (filteredData, wholeWeek) => {
  let total;
  if (wholeWeek === 'week') {
    total = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return total.slice(0, 7);
  } else {
  total = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  return total[0];
  }
};

//Filter all the user data to all the data of the current user
export const filterUserData = (data, currentUserObject) => {
  // console.log(data, 'data in filterUser')
  const filteredElement = data.filter((element) => {
    return element.userID === currentUserObject.id;
  });
  return filteredElement;
};

//Return how many hours a user slept for a specific day
export const specificSleepDay = (filterUser, dateOfSleep) => {
  const findDaySlept = filterUser.find(user => {
    return user.date === dateOfSleep;
  });
  const hoursOnDay = findDaySlept.hoursSlept;
  const string = `Slept for ${hoursOnDay} hours on ${dateOfSleep}`;
  return string;
};

//Replace getMilesPerDay, getUserSleepQuality (not being used in the DOM), getMinutesPerDay
export const getInfoPerDay = (currentUser, currentData, today, specific) => {
  const elementData = currentData.find(user => user.date === today.date);
  if (!elementData) {
    return '0';
  } else if (specific === 'numSteps') {
    const milesPerDay = ((currentUser.strideLength * elementData.numSteps) / 5280).toFixed(0);
    return milesPerDay;
  } else {
    return elementData[specific];
  }
}

// Return if a user reached their step goal for a given day
export const getStepGoal = (currentUser, currentActivityData, today) => {
  const activityUserID = currentActivityData.find(user => user.date === today.date);
  if (currentUser.dailyStepGoal >= activityUserID.numSteps) {
    const stepsLeft = currentUser.dailyStepGoal - activityUserID.numSteps;
    activityUserID.stepsLeft = stepsLeft;
    return activityUserID;
  } else {
    const stepsLeft = 0;
    activityUserID.stepsLeft = stepsLeft;
    return activityUserID
  }
};

//compare averageStep goal:
export const compareStepGoal = (currentUser, allUsers) => {
  const averageStepGoal = universalAverage(allUsers, 'dailyStepGoal'); 
  const userStepGoal = currentUser.dailyStepGoal;
  
  if (userStepGoal > averageStepGoal) {
    return `Your step goal, ${userStepGoal} steps, is higher than the average step goal ${averageStepGoal} steps among all users.`;
  } else if (userStepGoal < averageStepGoal) {
    return `Your step goal, ${userStepGoal} steps, is lower than the average step goal ${averageStepGoal} steps among all users.`;
  } else {
    return `Your step goal, ${userStepGoal} steps, is equal to the average step goal among all users.`;
  }
};

export const getOuncesPerDay = (userObj, dataList, date) => {
  const hydrationUserId = dataList.find(dataObj => dataObj.userID === userObj.id && dataObj.date === date);
  if (hydrationUserId) {
    return hydrationUserId.numOunces;
  } else {
    return 0;
  };
};

//drag function
export function setupDraggable(targetElement) {
interact(targetElement) 
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'relative',
        endOnly: true
      })
    ],
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
      end (event) {
        var textEl = event.target.targetElement

        textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
          Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px')
      }
    }
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true},
    modifiers: [
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),
      interact.modifiers.restrictSize({
        min: { width: 50, height: 50 }
      })
    ],
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset
      x = (parseFloat(x) || 0) + event.deltaRect.left
      y = (parseFloat(y) || 0) + event.deltaRect.top
      Object.assign(event.target.style, {
        width: `${event.rect.width}px`,
        height: `${event.rect.height}px`,
        transform: `translate(${x}px, ${y}px)`
      })

      Object.assign(event.target.dataset, { x, y })
      }
    }
  })
}

  export function dragMoveListener (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.style.cursor = 'grabbing';
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
  
  
  
    //   target.addEventListener('mouseenter', function() {
    //     target.style.cursor = 'grabbing';
    // })
    //   target.addEventListener('mouseleave', function() {
    //     target.style.cursor = 'grab';
    // })
      // update the posiion attributes