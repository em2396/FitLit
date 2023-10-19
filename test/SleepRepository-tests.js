import { expect } from "chai";

import {
  averageSleepDay,
  specificSleepDay,
  averageSleepQuality,
  getUserSleepQuality,
} from "../src/data-model.js";

import userSample from "../src/data/sampleData";

describe("SleepTests", () => {
  let users;

  beforeEach(() => {
    users = userSample.sleepData.filter((data) => data.userID === 1);
  });

// === happy path === //
  it("should return a user's average sleep per day", () => {
    const user1 = { hoursSlept: 8 };
    const user2 = { hoursSlept: 6 };
    const user3 = { hoursSlept: 7 };
    const users = [user1, user2, user3];
    const result = averageSleepDay(users);

    expect(result).to.equal("7");
  });

// === sad path === //
  it("should return 0 if no user data is found", () => {
    const users = [];
    const result = averageSleepDay(users);

    expect(result).to.equal("0");
  });

// === happy path === //
  it('should return the average of all time sleep quality', () => {
    const result = averageSleepQuality(users);
    expect(result).to.equal('4');
  });

// === sad path === //
  it("should return a user's sleep quality for a specific day", () => {
    const user = [
      { date: '2023/03/24', hoursSlept: 8 },
      { date: '2023/03/25', hoursSlept: 7 },
      { date: '2023/03/26', hoursSlept: 6 },
    ];
    const dateOfSleep = '2023/03/25';
    const result = specificSleepDay(user, dateOfSleep);
  
    expect(result).to.equal('Slept for 7 hours on 2023/03/25');
  });

// === sad path === //
  it('should return an empty object if no user data exists', () => {
    const emptyUserArray = [];
    const result = averageSleepDay(emptyUserArray);

    expect(result).to.equal('0');
  });

  // === happy path === //
  it('should return the average sleep when user data is available', () => {
    const userArray = [ 
      { date: '2023-10-01', hoursSlept: 8 },
      { date: '2023-10-02', hoursSlept: 6 },
      { date: '2023-10-03', hoursSlept: 7 },
    ];
    const result = averageSleepDay(userArray);
  
    expect(result).to.equal('7');
  });
});