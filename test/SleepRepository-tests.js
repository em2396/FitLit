import { expect } from "chai";
import { universalAverage, specificSleepDay } from "../src/data-model.js";
import userSample from "../src/data/sampleData";


describe("SleepTests", () => {
  let users;

  beforeEach(() => {
    users = userSample.sleepData.filter((data) => data.userID === 1);
  });

  it("should return a user's average sleep per day", () => {
    const users = [
      { hoursSlept: 8 },
      { hoursSlept: 6 },
      { hoursSlept: 7 },
    ];
    const result = universalAverage(users, 'hoursSlept');

    expect(result).to.equal('7');
  });

  it("should return 0 if no user data is found", () => {
    const users = [];
    const result = universalAverage(users, 'hoursSlept');

    expect(result).to.equal(0);
  });

  it("should return the average of all time sleep quality", () => {
    const users = [
      { sleepQuality: 3 },
      { sleepQuality: 4 },
      { sleepQuality: 5 },
    ];
    const result = universalAverage(users, 'sleepQuality');

    expect(result).to.equal('4');
  });

  it("should return a user's sleep quality for a specific day", () => {
    const users = [
      { date: "2023/03/24", hoursSlept: 8 },
      { date: "2023/03/25", hoursSlept: 7 },
      { date: "2023/03/26", hoursSlept: 6 },
    ];
    const dateOfSleep = "2023/03/25";
    const result = specificSleepDay(users, dateOfSleep);

    expect(result).to.equal("Slept for 7 hours on 2023/03/25");
  });

  it('should return an empty object if no user data exists', () => {
    const emptyUserArray = [];
    const result = universalAverage(emptyUserArray);

    expect(result).to.equal(0);
  });

  it('should return the average sleep when user data is available', () => {
    const userArray = [
      { date: '2023-10-01', hoursSlept: 8 },
      { date: '2023-10-02', hoursSlept: 6 },
      { date: '2023-10-03', hoursSlept: 7 },
    ];
    const result = universalAverage(userArray, 'hoursSlept');

    expect(result).to.equal('7');
  });
});





